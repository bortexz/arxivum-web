import { merge } from 'rxjs/observable/merge';
import { Observable, Subject } from 'rxjs/Rx';
import { addTypesToClass, DEFAULT_TYPES_PROP, TYPE_METADATA, typeName } from './types';
import { getOrSetMetadata, setMetadata } from './utils';
import { ActionCreatorMetadata, ActionsMetadata, METADATA_DISPATCHER } from './models';

const ACTIONS_METADATA = 'ngrx-actions-metadata';
const ACTION_CREATOR_METADATA = 'ngrx-actions-creator-metadata';

export function Action(target: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) {

  const actionsMetadata: ActionsMetadata = { methodName };
  const prevActions: ActionsMetadata[] = getOrSetMetadata(target, ACTIONS_METADATA, []);
  setMetadata(target, ACTIONS_METADATA, [ ...prevActions, actionsMetadata ]);

  addTypesToClass(target.constructor, methodName, typeName(target, methodName));

  // Override original value
  const originalMethod = descriptor.value;

  // editing the descriptor/value parameter
  const newMethod = function(...args: any[]) {
    const dispatcher = getOrSetMetadata(target, METADATA_DISPATCHER, new Subject());
    const result = originalMethod.apply(null, args);

    // get request async creator and dispatch action
    const creator = getOrSetMetadata(target, ACTION_CREATOR_METADATA, {})[methodName];
    dispatcher.next(creator(result));
    return result;
  };

  descriptor.value = newMethod;

  return descriptor;
};

export function createActions (instance: any, store): Observable<any> {
  const target = Object.getPrototypeOf(instance);
  const dispatcher = getOrSetMetadata(target, METADATA_DISPATCHER, new Subject());
  const types = getOrSetMetadata(target, TYPE_METADATA, DEFAULT_TYPES_PROP);

  const observables: Observable<any>[] = getOrSetMetadata(target, ACTIONS_METADATA)
    .map(
      ({ methodName }): any => {
        // Action creators for each action
        const type = target.constructor[types][methodName];
        const actionCreator = {
          [methodName]: (payload) => ({
            type: type,
            payload
          })
        };

        const actionCreators: ActionCreatorMetadata = getOrSetMetadata(target, ACTION_CREATOR_METADATA, {});
        setMetadata(target, ACTION_CREATOR_METADATA, {...actionCreators, ...actionCreator });

        return dispatcher;
      }
    );

  return merge(...observables);
}
