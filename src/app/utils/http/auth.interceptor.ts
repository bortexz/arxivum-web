import { Logout } from '../../core/authentication/authentication.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authToken;

  constructor(
    private store: Store<AppState>
  ) {
    store.select(state => state.authenticated)
      .subscribe(auth => {
        this.authToken = auth ? auth.token : null;
      });
  }

  // Comment
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authToken) {
      const clonedRequest = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.authToken}`
        )
      });

      return next.handle(clonedRequest)
        .catch(err => {
          if (err.status === 401) {
            this.store.dispatch(new Logout());
            return Observable.empty();
          } else return Observable.throw(err)

        });
    } else return next.handle(req);
  }
}
