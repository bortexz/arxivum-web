export interface IFile {
  _id: string;
  name: string;
  description?: string;
  size: number;
  folder?: string; // folder id
  torrent: any;
  encryption_key?: string;
}
