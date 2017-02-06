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
  @Effect()
  register$ = this.actions$
    .ofType(UsersActions.REGISTER)
    .switchMap(action => this.usersService.create(action.payload))
    .map(() => this.usersActions.registerSuccess())
    .catch((err) => Observable.of(this.usersActions.registerError(err)));

  @Effect()
  registerSuccess$ = this.actions$
    .ofType(UsersActions.REGISTER_SUCCESS)
    .withLatestFrom(this.store.select(state => state.users))
    .map(([_, usersState]) => this.authActions.login(
        usersState.register.email,
        usersState.register.password
      )
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
