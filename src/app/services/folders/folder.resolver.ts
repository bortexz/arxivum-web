import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FoldersService } from './folders.service';

@Injectable()
export class FolderResolver implements Resolve<any> {
  constructor(private foldersService: FoldersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.foldersService.getOne(route.params['id']);
  }
}
