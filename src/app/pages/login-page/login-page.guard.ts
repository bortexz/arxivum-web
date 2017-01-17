import { AppState } from '../../app.reducers';
import { AuthenticationState } from '../../core/authentication/authentication.reducer';
import { UsersService } from '../../core/users/users.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

/**
 * The logic is the following: If we ARE authenticated, then go to /home
 */
@Injectable()
export class LoginPageGuard implements CanActivate {
  authenticated: AuthenticationState;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.select(state => state.authenticated)
      .subscribe(auth => this.authenticated = auth)
  }

  canActivate() {
    if (this.authenticated) {
      this.router.navigate(['/folder']);
      return false;
    }
    return true;
  }
}
