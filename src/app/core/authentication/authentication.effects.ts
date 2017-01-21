import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Actions, Effect } from '@ngrx/effects';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { AuthenticationActions } from './authentication.actions';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  login$ = this.actions$
    .ofType(AuthenticationActions.LOGIN)
    .map(action => action.payload)
    .switchMap(({email, password}) => this.authService.login(email, password))
    .map(authenticated => this.authActions.loginSuccess(authenticated))
    .do(() => {
      this.router.navigate(['folder']);
    })
    .catch(error => {
      let action = this.authActions.loginError(error);
      // ngrx/effects is not yet supporting dispatch actions from errors.
      // see:
      this.store.dispatch(action);
      return Observable.of(action);
    });

  @Effect({dispatch: false})
  logout$ = this.actions$
    .ofType(AuthenticationActions.LOGOUT)
    .do(action => {
      this.router.navigate(['login']);
    });

  @Effect()
  error401$ = this.actions$
    .filter(action => action.payload && action.payload.error) // Only error requests
    .map(action => action.payload.error)
    .map(error => {
      if (error.status === 401) {
        return this.authActions.logout();
      }
      // return Observable.of(error);
    });

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private authActions: AuthenticationActions,
    private store: Store<AppState>
  ) { }
}
