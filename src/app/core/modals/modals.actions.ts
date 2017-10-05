import { IFile } from '../files/files.interfaces';
import { IFolder } from '../folders/folders.interfaces';

export const CLOSE_MODAL = '[Modals] Close modal';
export class CloseModal {
  readonly type = CLOSE_MODAL;
}

export const NEW_FOLDER = '[Modals] New folder';
export class NewFolder {
  readonly type = NEW_FOLDER;
  constructor (public parent) {}
}

export const UPDATE_FOLDER = '[Modals] Update folder';
export class UpdateFolder {
  readonly type = UPDATE_FOLDER;
  constructor(public folder: IFolder) {};
}

export const UPDATE_FILE = '[Modals] Update file';
export class UpdateFile {
  readonly type = UPDATE_FILE;
  constructor(public file: IFile) {};
}

export const DELETE_FOLDER = '[Modals] Delete folder';
export class DeleteFolder {
  readonly type = DELETE_FOLDER;
  constructor(public id) {};
}

export const DELETE_FILE = '[Modals] Delete file';
export class DeleteFile {
  readonly type = DELETE_FILE;
  constructor(public file) {}
}

export const INVITE_USER = '[Modals] Invite user';
export class InviteUser {
  readonly type = INVITE_USER;
}

export const DELETE_INVITATION = '[Modals] Delete invitation'
export class DeleteInvitation {
  readonly type = DELETE_INVITATION
  constructor(public id) {}
}
