import { Action } from '../../utils/ngrx-actions/action';
import { FilesService } from './files.service';
import { Injectable } from '@angular/core';
import { AsyncAction } from '../../utils/ngrx-actions/async-action';
import { Types, Type } from '../../utils/ngrx-actions/types';

@Injectable()
export class FilesActions {

  @Types
  static types;

  // @AsyncAction(function(action) { return this.fileApi.remove(action.payload.id); })
  // remove(id) {
  //   return { id };
  // };

  @Type static REMOVE;
  @Type static REMOVE_OK;
  @Type static REMOVE_ERR;
  remove = (id) => ({
    type: FilesActions.REMOVE,
    payload: { id },
    meta: {
      async_request: {
        req: ({ payload }) => this.fileApi.remove(id),
        success: () => ({ type: FilesActions.REMOVE_OK }),
        error: (error) => ({ type: FilesActions.REMOVE_ERR, error })
      }
    }
  })


  @Type static UPDATE;
  @Type static UPDATE_OK;
  @Type static UPDATE_ERR;
  update = (id, data) => ({
    type: FilesActions.UPDATE,
    payload: { id, data },
    meta: {
      async_request: {
        req: ({ payload }) => this.fileApi.update(payload.id, payload.data),
        success: (payload) => ({ type: FilesActions.UPDATE_OK, payload }),
        error: (error) => ({ type: FilesActions.UPDATE_ERR, error})
      }
    }

  })

  constructor(private fileApi: FilesService) { }

}
