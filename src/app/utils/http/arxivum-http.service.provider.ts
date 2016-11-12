import { XHRBackend, RequestOptions } from '@angular/http';
import { ArxivumHttp } from './arxivum-http.service';

export default {
  provide: ArxivumHttp,
  useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new ArxivumHttp(backend, defaultOptions),
  deps: [XHRBackend, RequestOptions]
};
