import { UploaderActions } from '../uploader/uploader.actions';
import { FilesActions } from '../files/files.actions';
import { FolderTreeActions } from './tree/tree.actions';
import { CurrentFolderState } from './folders.reducer';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FoldersActions } from './folders.actions';
import { FoldersService } from './folders.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { AuthenticationActions } from '../authentication/authentication.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class FoldersEffects {

  private currentFolder$ = this.store.select(state => state.currentFolder);

  @Effect()
  getFolder$ = this.actions$
    .ofType(FoldersActions.GET_FOLDER)
    .map(action => action.payload.id)
    .switchMap(id => this.foldersService.getOne(id)
      .map(folder => this.foldersActions.getFolderSuccess(folder))
      .catch(error => Observable.of(this.foldersActions.getFolderError(error)))
    );

  @Effect()
  createFolder$ = this.actions$
    .ofType(FoldersActions.CREATE_FOLDER)
    .map(action => action.payload)
    .switchMap(folder => this.foldersService.create(folder)
      .map(payload => this.foldersActions.createFolderSuccess(payload))
      .catch(error => Observable.of(this.foldersActions.createFolderError(error)))
    );

  @Effect()
  reloadTree$ = this.actions$
    .ofType(
      FoldersActions.CREATE_FOLDER_SUCCESS,
      FoldersActions.UPDATE_OK,
      FoldersActions.DELETE_OK
    )
    .withLatestFrom(this.currentFolder$)
    .map(([_, current]) => this.treeActions.getTree());

  @Effect()
  reloadFolders$ = this.actions$
    .ofType(
      FilesActions.DELETE_OK,
      FilesActions.UPDATE_OK,
      UploaderActions.UPLOAD_FILES_ON_SUCCESS_ITEM,
      FoldersActions.CREATE_FOLDER_SUCCESS,
      FoldersActions.UPDATE_OK,
      FoldersActions.DELETE_OK
    )
    .withLatestFrom(this.store.select(state => state.currentFolder))
    .map(([_, currentFolder]) => this.foldersActions.getFolder(currentFolder._id));

  constructor(
    private actions$: Actions,
    private foldersService: FoldersService,
    private router: Router,
    private foldersActions: FoldersActions,
    private treeActions: FolderTreeActions,
    private store: Store<AppState>
  ) { }
}
