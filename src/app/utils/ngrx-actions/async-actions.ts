import { getMetadata } from './utils';
import { Observable, Subject } from 'rxjs/Rx';
// decorator for async-actions
import { merge } from 'rxjs/observable/merge';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { Action, Store } from '@ngrx/store';

const ASYNC_ACTIONS_METADATA = 'ngrx-actions-async';
const ASYNC_ACTION_CREATOR_METADATA = 'ngrx-actions-async-creator';

export interface ActionsMetadata {
  methodName: string;
  dispatcher: Subject<any>;
}

export interface AsyncActionsMetadata extends ActionsMetadata {
  action: (action) => Observable<any>;
}

export interface AsyncActionCreatorMetadata {
  [key: string]: {request, success, error};
}

function defineTypeInMethod(target, type, value) {
  Object.defineProperty(target, type, {
    enumerable: false,
    configurable: false,
    writable: false,
    value
  });
}

export function AsyncAction(action: (action) => Observable<any>): MethodDecorator {
  return function(target: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) {

    const dispatcher = new Subject();

    const asyncActionMetadata: AsyncActionsMetadata = { methodName, action, dispatcher };

    // metadata
    if (!(Reflect as any).hasOwnMetadata(ASYNC_ACTIONS_METADATA, target)) {
      (Reflect as any).defineMetadata(ASYNC_ACTIONS_METADATA, [], target);
    }

    if (!(Reflect as any).hasOwnMetadata(ASYNC_ACTION_CREATOR_METADATA, target)) {
      (Reflect as any).defineMetadata(ASYNC_ACTION_CREATOR_METADATA, {}, target);
    }

    const actions: AsyncActionsMetadata[] = (Reflect as any).getOwnMetadata(ASYNC_ACTIONS_METADATA, target);
    const actionCreators: AsyncActionCreatorMetadata = (Reflect as any).getOwnMetadata(ASYNC_ACTION_CREATOR_METADATA, target);

    (Reflect as any).defineMetadata(ASYNC_ACTIONS_METADATA, [ ...actions, asyncActionMetadata ], target);

    const originalMethod = descriptor.value;

    // editing the descriptor/value parameter
    const newMethod = function(...args: any[]) {
      const result = originalMethod.apply(null, args);
      // get async creators
      console.log(target);
      const { request } = (Reflect as any).getOwnMetadata(ASYNC_ACTION_CREATOR_METADATA, target)[methodName];
      // Get dispatcher on metadata
      dispatcher.next(request(result));

      return result;
    };

    defineTypeInMethod(newMethod, 'REQUEST', `[${target.name}] ${methodName}Request`);
    defineTypeInMethod(newMethod, 'SUCCESS', `[${target.name}] ${methodName}Success`);
    defineTypeInMethod(newMethod, 'ERROR', `[${target.name}] ${methodName}Error`);

    descriptor.value = newMethod;

    return descriptor;
  };
}

export function createActions (instance: any, store): Observable<any> {
  // assign metadata somehow ?
  // console.log((Reflect as any).getOwnMetadata(ASYNC_ACTIONS_METADATA, instance.constructor));
  const observables: Observable<any>[] = (Reflect as any).getOwnMetadata(ASYNC_ACTIONS_METADATA, instance.constructor).map(
    ({ methodName, action, dispatcher }): any => {
      // we have instance here, subscribe for dispatcher and effectObservable. dispatcher + effectObservable go to store
      const asyncActionCreators = {
        [methodName]: {
          request: (request) => ({
            type: `[${instance.constructor.name}] ${methodName}Request`,
            request
          }),
          success: (payload) => ({
            type: `[${instance.constructor.name}] ${methodName}Success`,
            payload
          }),
          error: (error) => ({
            type: `[${instance.constructor.name}] ${methodName}Error`,
            error
          })
        }
      };

      const prevCreators = (Reflect as any).getOwnMetadata(ASYNC_ACTION_CREATOR_METADATA, instance.constructor);
      (Reflect as any).defineMetadata(ASYNC_ACTION_CREATOR_METADATA,
        {...prevCreators, ...asyncActionCreators },
        instance.constructor
      );

      const { success, error } = asyncActionCreators[methodName];

      const effectObservable = dispatcher
        .filter(({ type }: any) => type === `[${instance.constructor.name}] ${methodName}Request`)
        .switchMap(act => action.bind(instance)(act)
          .map(payload => success(payload))
          .catch(err => Observable.of(error(err)))
        );

      return merge(dispatcher, effectObservable);
    }
  );

  return merge(...observables);
}

