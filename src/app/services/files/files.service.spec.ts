/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilesService } from './files.service';

describe('FilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesService]
    });
  });

  it('should ...', inject([FilesService], (service: FilesService) => {
    expect(service).toBeTruthy();
  }));
});
