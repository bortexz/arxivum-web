import { FilesService } from './files.service';
import { Injectable } from '@angular/core';
import { AsyncAction } from '../../utils/ngrx-actions/async-actions';

@Injectable()
export class FilesActions {

  // @ActionTypes
  static types;

  @AsyncAction(function(action) {
    return this.fileApi.remove(action.request.id);
  })
  remove(id) {
    return { id };
  };

  constructor(private fileApi: FilesService) { }

}
