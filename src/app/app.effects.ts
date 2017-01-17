import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
/**
 *
 */

@Injectable()
export class AppEffects {
  @Effect({ dispatch: false })
  logger$ = this.actions$
    .do(action => console.log(action.type, action.payload));

  constructor(
    private actions$: Actions
  ) {

  }
}
