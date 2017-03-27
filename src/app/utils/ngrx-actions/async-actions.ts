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

function typeName (target, methodName, type) {
  return `[${target.constructor.name}] ${methodName}-${type}`;
}

const DEFAULT_TYPES_PROP = 'types';

function addTypesToClass (target, methodName, typesObj, opts?) {
  // const proto = Object.getPrototypeOf(target);
  if (!target[DEFAULT_TYPES_PROP]) {
    Object.defineProperty(target, DEFAULT_TYPES_PROP, {
      value: {
        [methodName]: typesObj
      },
      enumerable: true
    });
  } else {
    target[DEFAULT_TYPES_PROP][methodName] = typesObj;
  }
}

export function AsyncAction(action: (action) => Observable<any>): MethodDecorator {
  return function(target: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) {

    const dispatcher = new Subject();
    const asyncActionMetadata: AsyncActionsMetadata = { methodName, action, dispatcher };

    const actions: AsyncActionsMetadata[] = (Reflect as any).getOwnMetadata(ASYNC_ACTIONS_METADATA, target) || [];

    (Reflect as any).defineMetadata(ASYNC_ACTIONS_METADATA, [ ...actions, asyncActionMetadata ], target);

    // Override original value
    const originalMethod = descriptor.value;

    // editing the descriptor/value parameter
    const newMethod = function(...args: any[]) {
      const result = originalMethod.apply(null, args);
      // get request async creator
      const { request } = (Reflect as any).getOwnMetadata(ASYNC_ACTION_CREATOR_METADATA, target)[methodName];
      // Get dispatcher on metadata
      dispatcher.next(request(result));
      return result;
    };

    descriptor.value = newMethod;

    return descriptor;
  };
}

export function createActions (instance: any, store): Observable<any> {
  const target = Object.getPrototypeOf(instance);

  console.log((Reflect as any).getOwnMetadata(ASYNC_ACTIONS_METADATA, target));
  const observables: Observable<any>[] = (Reflect as any).getOwnMetadata(ASYNC_ACTIONS_METADATA, target).map(
    ({ methodName, action, dispatcher }): any => {
      // generate types for each action.
      // Has to be added to constructor to be accessible directly by ActionsClass.types.
      addTypesToClass(target.constructor, methodName, {
        REQUEST: typeName(target, methodName, 'request'),
        SUCCESS: typeName(target, methodName, 'success'),
        ERROR: typeName(target, methodName, 'error')
      });

      // Action creators for each action
      const typesObj = target.constructor[DEFAULT_TYPES_PROP][methodName];
      const asyncActionCreators = {
        [methodName]: {
          request: (request) => ({
            type: typesObj.REQUEST,
            request
          }),
          success: (payload) => ({
            type: typesObj.SUCCESS,
            payload
          }),
          error: (error) => ({
            type: typesObj.ERROR,
            error
          })
        }
      };

      const actionCreators: AsyncActionCreatorMetadata = (Reflect as any).getOwnMetadata(ASYNC_ACTION_CREATOR_METADATA, target) || {};
      (Reflect as any).defineMetadata(ASYNC_ACTION_CREATOR_METADATA, {...actionCreators, ...asyncActionCreators }, target);

      const { success, error } = asyncActionCreators[methodName];

      // Use the types here based on method name? already in the Class.
      const effectObservable = dispatcher
        .filter(({ type }: any) => type === typeName(target, methodName, 'request'))
        .switchMap(act => action.bind(instance)(act)
          .map(payload => success(payload))
          .catch(err => Observable.of(error(err)))
        );

      return merge(dispatcher, effectObservable);
    }
  );

  return merge(...observables);
}

