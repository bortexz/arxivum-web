import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from '../../services/authentication/authentication.service';

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
    if (this.authService) {
      this.authService.logout();
    }
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const user = localStorage.getItem('user');
    if (user) {
      const authToken = JSON.parse(user).token;
      if (authToken) {
        if (url instanceof Request) {
          url.headers.append('Authorization', `Bearer ${authToken}`);
        } else if (!options || !options.headers) {
          if (!options) {
            options = new RequestOptions();
          }
          options.headers = new Headers();
          options.headers.append('Authorization', `Bearer ${authToken}`);
        }
      }

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
