import { Observable } from 'rxjs/Observable';
import { FoldersActions } from '../folders/folders.actions';
import { FilesActions } from '../files/files.actions';
import { Actions, Effect } from '@ngrx/effects';
import { ModalsActions } from './modals.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Injectable } from '@angular/core';

const nameFormModalSelector = (state: AppState) => state.modals.nameForm;

@Injectable()
export class ModalsEffects {

  nameFormModalState = this.store.select(nameFormModalSelector);

  @Effect()
  saveNameForm$ = this.actions$
    .ofType(ModalsActions.SAVE_NAME_FORM_MODAL)
    .withLatestFrom(this.nameFormModalState)
    .switchMap(([action, nameForm]) => {
      const name = action.payload.name;
      const actions = [this.modalsActions.closeNameFormModal()];
      switch (nameForm.trigger) {
        case ModalsActions.UPDATE_FILE_NAME:
          actions.push(this.fileActions.update(nameForm.entity._id, { name }));
        case ModalsActions.NEW_FOLDER:
          actions.push(this.folderActions.createFolder({ name }));
        case ModalsActions.UPDATE_FOLDER_NAME:
          //nameAction = this.folderActions
      }
      return Observable.from(actions);
    });

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private fileActions: FilesActions,
    private folderActions: FoldersActions,
    private modalsActions: ModalsActions
  ) { }
}
