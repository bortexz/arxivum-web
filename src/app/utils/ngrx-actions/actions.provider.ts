import { createActions } from './action';
import { merge } from 'rxjs/observable/merge';
import { createAsyncActions } from './async-action';
import { Action, Store } from '@ngrx/store';
import { Observer, Subscription } from 'rxjs/Rx';
import { Inject, Injectable, OnDestroy, OpaqueToken, Optional, SkipSelf } from '@angular/core';

export const actionsToken = new OpaqueToken('ngrx-async-actions');

@Injectable()
export class NgrxActions extends Subscription implements OnDestroy {
  constructor(
    @Inject(Store) private store: Observer<Action>,
    @Optional() @SkipSelf() public parent: NgrxActions,
    @Optional() @Inject(actionsToken) instances?: any[]
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
    const asyncActions = instances.map(createAsyncActions);
    const actions = instances.map(createActions);
    const merged = merge(...asyncActions, ...actions);
    this.add(merged.subscribe(this.store));
  }

  ngOnDestroy() {
    if (!this.closed) {
      this.unsubscribe();
    }
  }
}
