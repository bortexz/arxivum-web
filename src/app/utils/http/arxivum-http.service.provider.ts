import { XHRBackend, RequestOptions } from '@angular/http';
import { ArxivumHttp } from './arxivum-http.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export default {
  provide: ArxivumHttp,
  useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, authService: AuthenticationService) => {
    return new ArxivumHttp(backend, defaultOptions, authService);
  },
  deps: [XHRBackend, RequestOptions, AuthenticationService]
};
