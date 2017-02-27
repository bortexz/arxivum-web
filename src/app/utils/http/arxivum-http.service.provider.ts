import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { XHRBackend, RequestOptions } from '@angular/http';
import { ArxivumHttp } from './arxivum-http.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

export const ArxivumHttpProvider =  {
  provide: ArxivumHttp,
  useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, store: Store<AppState>) => {
    return new ArxivumHttp(backend, defaultOptions, store);
  },
  deps: [XHRBackend, RequestOptions, Store]
};
