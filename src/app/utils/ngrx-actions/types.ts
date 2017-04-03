import { getOrSetMetadata, setMetadata } from './utils';
import { Observable } from 'rxjs/Rx';

export const TYPE_METADATA = 'ngrx-actions-type';
export const DEFAULT_TYPES_PROP = '__types';

export function typeName (target, methodName, type?) {
  return `[${target.constructor.name}] ${methodName}` + (type ? `-${type}` : '');
}

export function addTypesToClass (target, methodName, types: string | Object, opts?) {
  const typesProp = getOrSetMetadata(target, TYPE_METADATA, DEFAULT_TYPES_PROP);

  target[typesProp] = target[typesProp] || {};
  Object.assign(target[typesProp], {
    [methodName]: types
  });
}

export function Types(target: any, propName: string): void {
  setMetadata(target, TYPE_METADATA, propName);

  // because this function can be called after another decorator,
  // move types from default to specified prop.
  if (target[DEFAULT_TYPES_PROP]) {
    target[propName] = target[propName] || {};
    Object.assign(target[propName], target[DEFAULT_TYPES_PROP]);
  }
};

