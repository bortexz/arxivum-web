import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { XHRBackend, RequestOptions } from '@angular/http';
import { ArxivumHttp } from './arxivum-http.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export default {
  provide: ArxivumHttp,
  useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, store: Store<AppState>) => {
    return new ArxivumHttp(backend, defaultOptions, store);
  },
  deps: [XHRBackend, RequestOptions, Store]
};
