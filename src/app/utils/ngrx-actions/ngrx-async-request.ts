import { Action, Store } from '@ngrx/store';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { Actions } from '@ngrx/effects';
import { Inject, Injectable, NgModule, OnDestroy, Type } from '@angular/core';

const noop = () => undefined;

@Injectable()
export class NgrxAsyncRequest implements OnDestroy {
  subscription: Subscription;

  constructor(
    private actions$: Actions,
    @Inject(Store) private store: Observer<Action>,
  ) {
    this.subscription = new Subscription();

    this.subscription.add(
      this.actions$
        .filter(({ meta }) => Boolean(meta && meta.async_request))
        .switchMap(action => action.meta.async_request.req(action)
          .map(payload => (action.meta.async_request.success || noop)(payload))
          .catch(error => Observable.of((action.meta.async_request.error || noop)(error)))
        )
        .filter((action: Action) => Boolean(action && action.type))
        .subscribe(this.store)
    );
  }

  ngOnDestroy() {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}

@NgModule({
  providers: [
    NgrxAsyncRequest
  ]
})
export class NgrxAsyncRequestModule {}
