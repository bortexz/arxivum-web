import { IFile } from '../files/files.interfaces';
import { IFolder } from '../folders/folders.interfaces';
import { Type } from '../../utils/ngrx-actions/types';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalsActions {
  @Type static UPDATE_FOLDER_NAME;
  updateFolderName = (payload: IFolder) => ({ type: ModalsActions.UPDATE_FOLDER_NAME, payload });

  @Type static NEW_FOLDER;
  newFolder = () => ({ type: ModalsActions.NEW_FOLDER });

  @Type static UPDATE_FILE_NAME;
  updateFileName = (payload: IFile) => ({ type: ModalsActions.UPDATE_FILE_NAME, payload });

  @Type static CLOSE_NAME_FORM_MODAL;
  closeNameFormModal = () => ({ type: ModalsActions.CLOSE_NAME_FORM_MODAL });

  @Type static SAVE_NAME_FORM_MODAL;
  saveNameFormEntity = name => ({ type: ModalsActions.SAVE_NAME_FORM_MODAL, payload: { name } });

}
