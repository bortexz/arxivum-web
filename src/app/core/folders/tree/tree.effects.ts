import { FoldersService } from '../folders.service';
import { FolderTreeActions } from './tree.actions';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class FolderTreeEffects {
  @Effect()
  getTree$ = this.actions$
    .ofType(FolderTreeActions.GET_TREE)
    .switchMap(() => this.foldersService.getTree()
      .map(tree => this.treeActions.getTreeSuccess(tree))
      .catch(err => Observable.of(this.treeActions.getTreeError(err)))
    );

  constructor (
    private actions$: Actions,
    private treeActions: FolderTreeActions,
    private foldersService: FoldersService
  ) {}
}
