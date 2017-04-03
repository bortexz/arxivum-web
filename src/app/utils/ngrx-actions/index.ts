import { NgrxActions, actionsToken } from './actions.provider';
import { NgModule, Injector, Type, APP_BOOTSTRAP_LISTENER, OpaqueToken } from '@angular/core';
// import { runAfterBootstrapEffects, afterBootstrapEffects } from './bootstrap-listener';

@NgModule({
  providers: [
    NgrxActions
  ]
})
export class NgrxActionsModule {
  static run(type: Type<any>) {
    return {
      ngModule: NgrxActionsModule,
      providers: [
        NgrxActions,
        type,
        {provide: actionsToken, useExisting: type, multi: true}
      ]
    };
  }

  constructor() {}
}
