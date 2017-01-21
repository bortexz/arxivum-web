import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
const debug = require('debug')('arxivum:action-logger');
/**
 *
 */

@Injectable()
export class AppEffects {
  @Effect({ dispatch: false })
  logger$ = this.actions$
    .do(action => debug(action.type, action.payload));

  constructor(
    private actions$: Actions
  ) {
  }
}
