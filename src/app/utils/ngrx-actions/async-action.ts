import { of } from 'rxjs/observable/of';
import { addTypesToClass, DEFAULT_TYPES_PROP, TYPE_METADATA, typeName } from './types';
import { AsyncActionCreatorMetadata, METADATA_DISPATCHER } from './models';
import { AsyncActionsMetadata } from './models';
import { Observable, Subject } from 'rxjs/Rx';
// decorator for async-actions
import { merge } from 'rxjs/observable/merge';
import { Action, Store } from '@ngrx/store';
import { getOrSetMetadata, setMetadata } from './utils';

const ASYNC_ACTIONS_METADATA = 'ngrx-actions-async';
const ASYNC_ACTION_CREATOR_METADATA = 'ngrx-actions-async-creator';

export function AsyncAction(action: (action) => Observable<any>): MethodDecorator {
  return function(target: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) {

    const asyncActionMetadata: AsyncActionsMetadata = { methodName, action };
    const prevActions: AsyncActionsMetadata[] = getOrSetMetadata(target, ASYNC_ACTIONS_METADATA, []);
    setMetadata(target, ASYNC_ACTIONS_METADATA, [ ...prevActions, asyncActionMetadata ]);

    // generate types for each action.
    // Has to be added to constructor to be accessible directly by ActionsClass.types.
    addTypesToClass(target.constructor, methodName, {
      REQUEST: typeName(target, methodName, 'request'),
      SUCCESS: typeName(target, methodName, 'success'),
      ERROR: typeName(target, methodName, 'error')
    });

    const originalMethod = descriptor.value;
    const newMethod = function(...args: any[]) {
      const dispatcher = getOrSetMetadata(target, METADATA_DISPATCHER, new Subject());
      const result = originalMethod.apply(null, args);

      // get request async creator and dispatch action
      const { request } = getOrSetMetadata(target, ASYNC_ACTION_CREATOR_METADATA, {})[methodName];
      dispatcher.next(request(result));
      return result;
    };

    descriptor.value = newMethod;

    return descriptor;
  };
}

export function createAsyncActions (instance: any, store): Observable<any> {
  const target = Object.getPrototypeOf(instance);
  const dispatcher = getOrSetMetadata(target, METADATA_DISPATCHER, new Subject());
  const types = getOrSetMetadata(target, TYPE_METADATA, DEFAULT_TYPES_PROP);

  const observables: Observable<any>[] = getOrSetMetadata(target, ASYNC_ACTIONS_METADATA)
    .map(
      ({ methodName, action }): any => {
        // Action creators for each action
        const typesObj = target.constructor[types][methodName];
        const asyncActionCreators = {
          [methodName]: {
            request: (payload) => ({
              type: typesObj.REQUEST,
              payload
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

        const actionCreators: AsyncActionCreatorMetadata = getOrSetMetadata(target, ASYNC_ACTION_CREATOR_METADATA, {});
        setMetadata(target, ASYNC_ACTION_CREATOR_METADATA, {...actionCreators, ...asyncActionCreators });

        // Create async action effect
        const { success, error } = asyncActionCreators[methodName];

        const effectObservable = dispatcher
          .filter(({ type }: any) => type === target.constructor[types][methodName].REQUEST)
          .switchMap(act => action.bind(instance)(act)
            .map(payload => success(payload))
            .catch(err => of(error(err)))
          );

        return merge(dispatcher, effectObservable);
      }
    );

  return merge(...observables);
}

