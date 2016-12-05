/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArxivumHttp } from './arxivum-http.service';

describe('Service: ArxivumHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArxivumHttp]
    });
  });

  it('should ...', inject([ArxivumHttp], (service: ArxivumHttp) => {
    expect(service).toBeTruthy();
  }));
});
