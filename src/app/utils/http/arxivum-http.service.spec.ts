/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArxivumHttpService } from './arxivum-http.service';

describe('Service: ArxivumHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArxivumHttpService]
    });
  });

  it('should ...', inject([ArxivumHttpService], (service: ArxivumHttpService) => {
    expect(service).toBeTruthy();
  }));
});
