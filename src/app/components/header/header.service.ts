import { Router } from '@angular/router';
import { PlayerState } from '../../core/player/player.reducer';
import { AuthenticationState } from '../../core/authentication/authentication.reducer';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as AuthActions from '../../core/authentication/authentication.actions';

@Injectable()
export class HeaderService {
  authenticated$: Observable<AuthenticationState>;
  player$: Observable<PlayerState>;

  logout () {
    this.store.dispatch(new AuthActions.Logout());
  }

  userInfo () {
    this.router.navigate(['/userinfo'])
  }

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.authenticated$ = store.select(state => state.authenticated);
    this.player$ = store.select(state => state.player);
  }
}
