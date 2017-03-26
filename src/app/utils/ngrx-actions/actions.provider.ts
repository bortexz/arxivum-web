import { merge } from 'rxjs/observable/merge';
import { createActions } from './async-actions';
import { Action, Store } from '@ngrx/store';
import { Observer, Subscription } from 'rxjs/Rx';
import { Inject, Injectable, OnDestroy, OpaqueToken, Optional, SkipSelf } from '@angular/core';

export const asyncActions = new OpaqueToken('ngrx-async-actions');

@Injectable()
export class AsyncActions extends Subscription implements OnDestroy {
  constructor(
    @Inject(Store) private store: Observer<Action>,
    @Optional() @SkipSelf() public parent: AsyncActions,
    @Optional() @Inject(asyncActions) instances?: any[]
  ) {
    super();

    if (Boolean(parent)) {
      parent.add(this);
    }

    if (Boolean(instances)) {
      this.addActions(instances);
    }
  }

  /**
   *
   * @param instances of services using async actions, provided through run in ngmodule
   */
  addActions(instances) {
    const sources = instances.map(createActions);
    const actions = merge(...sources);
    this.add(actions.subscribe(this.store));
  }

  ngOnDestroy() {
    if (!this.closed) {
      this.unsubscribe();
    }
  }
}
