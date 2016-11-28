import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FoldersService } from './folders.service';

@Injectable()
export class RootFolderResolver implements Resolve<any> {
  constructor(private foldersService: FoldersService) {}

  resolve(): Observable<any> {
    return this.foldersService.getAll();
  }
}
