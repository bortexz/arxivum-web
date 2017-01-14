import { IFile } from '../files/files.interfaces';

export interface IFolder {
  _id: string;
  name: string;
}

export interface ICurrentFolder extends IFolder {
  files: IFile[];
  folders: IFolder[];
  ancestors: IFolder[];
}
