import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { AuthenticationActions } from '../authentication/authentication.actions';
import { Observable } from 'rxjs/Rx';
import { UsersService } from './users.service';
import { UsersActions } from './users.actions';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersEffects {
  // register
  @Effect()
  register$ = this.actions$
    .ofType(UsersActions.REGISTER)
    .do(console.log)
    .switchMap(action => this.usersService.register(action.payload))
      .map(() => this.usersActions.registerSuccess())
      .catch((err) => Observable.of(this.usersActions.registerError(err))
    );

  @Effect()
  registerSuccess$ = this.actions$
    .ofType(UsersActions.REGISTER_SUCCESS)
    .withLatestFrom(this.store.select(state => state.register))
    .map(([_, registerState]) => this.authActions.login(
        registerState.register.email,
        registerState.register.password
      )
    );

  // admin user actions
  @Effect()
  getUsers$ = this.actions$
    .ofType(UsersActions.GET_USERS)
    .switchMap(() => this.usersService.getAll())
      .map(users => this.usersActions.getUsersSuccess(users))
      .catch(err => Observable.of(this.usersActions.getUsersError(err))
    );

  constructor(
    private actions$: Actions,
    private usersActions: UsersActions,
    private usersService: UsersService,
    private authActions: AuthenticationActions,
    private store: Store<AppState>
  ) {

  }
}
