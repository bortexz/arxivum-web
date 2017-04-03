import { Action } from '../../utils/ngrx-actions/action';
import { FilesService } from './files.service';
import { Injectable } from '@angular/core';
import { AsyncAction } from '../../utils/ngrx-actions/async-action';
import { Types } from '../../utils/ngrx-actions/types';

@Injectable()
export class FilesActions {

  @Types
  static types;

  @AsyncAction(function(action) { return this.fileApi.remove(action.payload.id); })
  remove(id) {
    return { id };
  };

  @Action
  recreate (id1, id2) {
    return {
      id1,
      id2
    };
  }

  constructor(private fileApi: FilesService) { }

}
