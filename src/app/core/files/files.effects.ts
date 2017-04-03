import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { FoldersActions } from '../folders/folders.actions';
import { FilesActions } from './files.actions';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class FilesEffects {

  @Effect()
  onFileRemoved$ = this.actions$
    .ofType(FilesActions.types.remove.SUCCESS)
    .withLatestFrom(this.store.select(state => state.currentFolder))
    .map(([_, currentFolder]) => this.foldersActions.getFolder(currentFolder._id));

  constructor(
    private actions$: Actions,
    private foldersActions: FoldersActions,
    private store: Store<AppState>
  ) { }
}
