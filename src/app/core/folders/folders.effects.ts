import { Observable } from 'rxjs/Observable';
import { AppError } from '../common/errors.actions';
import { FoldersService } from './folders.service';
import { Actions, Effect } from '@ngrx/effects';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as FoldersActions from './folders.actions';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/observable/of'

@Injectable()
export class FoldersEffects {
  private currentFolder$ = this.store.select(state => state.currentFolder);

  @Effect()
  reloadList$ = this.actions$
    .ofType(FoldersActions.RELOAD_LIST)
    .withLatestFrom(this.currentFolder$)
    .map(([_, currentFolder]) => new FoldersActions.GoToFolder(currentFolder._id))

  @Effect()
  goToFolder$ = this.actions$
    .ofType(FoldersActions.GO_TO_FOLDER)
    .switchMap((action: FoldersActions.GoToFolder) => this.foldersApi.getOne(action.id)
      .map(payload => new FoldersActions.UpdateFolderList(payload))
      .catch(error => Observable.of(new AppError('Could not load folder')))
    );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private foldersApi: FoldersService
  ) {}
}
