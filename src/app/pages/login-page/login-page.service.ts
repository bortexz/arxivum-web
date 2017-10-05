import { Subject } from 'rxjs/Rx';
import { AuthenticationState } from '../../core/authentication/authentication.reducer';
import { AppError } from '../../core/common/errors.actions';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LoginSuccess } from '../../core/authentication/authentication.actions';

@Injectable()
export class LoginPageService {

  error$ = new Subject<String>();

  closeError () {
    this.error$.next(null);
  }

  login (email, password) {
    this.authApi.login(email, password)
      .subscribe(
        auth => {
          this.error$.next(null);
          this.store.dispatch(new LoginSuccess(<AuthenticationState>auth));
        },
        err => {
          let message;
          switch (err.status) {
            case 401: message = 'Username or password incorrect'; break;
            case 500: message = 'Server is down'; break;
            default: message = 'An unknown error happened'; break;
          }
          this.error$.next(message);
        }
      );
  }

  constructor(
    private store: Store<AppState>,
    private authApi: AuthenticationService
  ) {}
}
