import { AppState } from '../../app.reducers';
import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  Headers,
  Http,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response
} from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

/**
 * HTTP service that adds the Authorization header automatically from localStorage
 * and redirects to state login if received Unauthorized response.
 */
@Injectable()
export class ArxivumHttp extends Http {
  authToken: string;

  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: RequestOptions,
    private store: Store<AppState>
  ) {
    super(backend, defaultOptions);
    store.select(state => state.authenticated)
      .subscribe(auth => {
        this.authToken = auth ? auth.token : null;
      });
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (this.authToken) {
      if (url instanceof Request) {
        url.headers.append('Authorization', `Bearer ${this.authToken}`);
      } else if (!options || !options.headers) {
        if (!options) {
          options = new RequestOptions();
        }
        options.headers = new Headers();
        options.headers.append('Authorization', `Bearer ${this.authToken}`);
      }
    }

    return super.request(url, options);
  }
}
