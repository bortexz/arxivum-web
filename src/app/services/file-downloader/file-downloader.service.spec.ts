/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileDownloaderService } from './file-downloader.service';

describe('FileDownloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileDownloaderService]
    });
  });

  it('should ...', inject([FileDownloaderService], (service: FileDownloaderService) => {
    expect(service).toBeTruthy();
  }));
});
