import { Action } from '@ngrx/store';
// import { FoldersService } from './folders.service';
// import { Type } from '../../utils/ngrx-actions/types';
// import { Injectable } from '@angular/core';

export const GO_TO_FOLDER = '[Folders] Go to folder' // Action triggered when the router changes route
export class GoToFolder implements Action {
  readonly type = GO_TO_FOLDER;
  constructor(public id) {}
}

export const UPDATE_FOLDER_LIST = '[Folders] Update folder list';
export class UpdateFolderList implements Action {
  readonly type = UPDATE_FOLDER_LIST;
  constructor(public payload) {}
}

export const RELOAD_LIST = '[Folders] Reload list';
export class ReloadList implements Action {
  readonly type = RELOAD_LIST;
}

export const UPDATE_TREE = '[Folder tree] Update folder tree';
export class UpdateTree implements Action {
  readonly type = UPDATE_TREE;
  constructor(public tree) {};
}
