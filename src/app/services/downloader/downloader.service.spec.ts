/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DownloaderService } from './downloader.service';

describe('FileDownloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloaderService]
    });
  });

  it('should ...', inject([DownloaderService], (service: DownloaderService) => {
    expect(service).toBeTruthy();
  }));
});
