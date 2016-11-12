import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from '../../services/authentication/authentication.service';

const INCORRECT_CREDENTIALS = 'Incorrect credentials';

/**
 * HTTP service that adds the Authorization header automatically from localStorage
 * and redirects to state login if received Unauthorized response.
 */
@Injectable()
export class ArxivumHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private authService?: AuthenticationService) {
    super(backend, defaultOptions);
  }

  private onAuthError = (err) => {
    const body = JSON.parse(err._body);
    if (!(body.message === INCORRECT_CREDENTIALS)) {
      if (this.authService) {
        this.authService.logout();
      }
    }
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      if (!options || !options.headers) {
        if (!options) {
          options = {};
        }
        options.headers = new Headers();
      }
      options.headers.append('Authorization', 'Bearer ' + authToken);
    }

    return super.request(url, options)
      .catch((err) => {
        if (err.status === 401) {
          this.onAuthError(err);
        }
        return Observable.throw(err);
      });
  }
}
