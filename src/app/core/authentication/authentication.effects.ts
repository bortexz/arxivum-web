import { AppState } from '../../app.reducers';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Actions, Effect } from '@ngrx/effects';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import * as AuthActions from './authentication.actions';

interface AuthErrorAction extends Action {
  error: any;
}

@Injectable()
export class AuthenticationEffects {

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .ofType(AuthActions.LOGIN_SUCCESS)
    .do(action => this.router.navigate(['files/list']));

  @Effect({dispatch: false})
  logout$ = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(action => this.router.navigate(['login']));

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
  ) { }
}
