import { AsyncActions, asyncActions } from './actions.provider';
import { Actions } from '@ngrx/effects';
import { NgModule, Injector, Type, APP_BOOTSTRAP_LISTENER, OpaqueToken } from '@angular/core';
// import { runAfterBootstrapEffects, afterBootstrapEffects } from './bootstrap-listener';

@NgModule({
  providers: [
    AsyncActions
  ]
})
export class NgrxActionsModule {
  static run(type: Type<any>) {
    return {
      ngModule: NgrxActionsModule,
      providers: [
        AsyncActions,
        type,
        {provide: asyncActions, useExisting: type, multi: true}
      ]
    };
  }

  constructor() {}
}
