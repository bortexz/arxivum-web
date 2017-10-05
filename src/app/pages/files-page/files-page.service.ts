import { IFile } from '../../core/files/files.interfaces';
import * as PlayerActions from '../../core/player/player.actions';
import { IDownloadingFile } from '../../core/downloader/downloader.reducer';
import { Router } from '@angular/router';
import * as DownloaderActions from '../../core/downloader/downloader.actions';
import { Observable } from 'rxjs/Rx';
import { DownloaderService } from '../../core/downloader/downloader.service';
import { UploaderService } from '../../core/uploader/uploader.service';
import * as UploaderActions from '../../core/uploader/uploader.actions';
import * as ModalsActions from '../../core/modals/modals.actions';
import { AppError } from '../../core/common/errors.actions';
import * as FoldersActions from '../../core/folders/folders.actions';
import { FilesService } from '../../core/files/files.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Injectable } from '@angular/core';

const R = require('ramda');

@Injectable()
export class FilesPageService {
  public currentFolder$ = this.store.select(state => state.currentFolder);
  public authenticated$ = this.store.select(state => state.authenticated);
  public downloadData$ = this.store.select(state => state.downloadData);
  public downloadingList$ = this.store.select(state => state.downloading);

  public uploadingList$ = this.store.select(state => state.uploading);
  public uploadData$ = this.store.select(state => state.uploadData);

  // private player$ = this.store.select(state => state.player);

  public uploader = this.uploaderService.uploader;

  // navigation
  goTo(path) {
    this.router.navigate(['/files/' + path])
  }

  goToFolder (id) {
    this.store.dispatch(new FoldersActions.GoToFolder(id));
  }

  // folders
  newFolder () {
    // We take latest currentFolder value, as it's the parent.
    // More reactive would be clock events as observables,
    // but ng API not ready for it yet.
    let parentId;
    this.store
      .select(state => state.currentFolder._id)
      .take(1)
      .subscribe(currentId => parentId = currentId);

    this.store.dispatch(new ModalsActions.NewFolder(parentId));
  }

  editFolder (folder) {
    this.store.dispatch(new ModalsActions.UpdateFolder(folder));
  }

  deleteFolder (folderId) {
    this.store.dispatch(new ModalsActions.DeleteFolder(folderId));
  }

  editFile (file) {
    this.store.dispatch(new ModalsActions.UpdateFile(file));
  }

  deleteFile (file) {
    this.store.dispatch(new ModalsActions.DeleteFile(file));
  }

  downloadFile (file) {
    Observable.fromPromise(this.downloaderService.download(file))
      .subscribe(downloadingFile => {
        this.store.dispatch(new DownloaderActions.AddDownloadFile(downloadingFile))
      })
  }

  removeDownloadingFile (file) {
    this.store.dispatch(new DownloaderActions.RemoveFile(file))
  }

  uploadFiles () {
    this.store.dispatch(new UploaderActions.UploadFiles());
  }

  clearUploadQueue () {
    this.store.dispatch(new UploaderActions.ClearQueue());
  }

  // A bit messy
  playFile (file: IFile) {
    // Check if is already downloading
    let downloading;
    this.store
      .select(state => state.downloading)
      .take(1)
      .subscribe(
        data => {
          downloading = R.find(elem => elem._id === file._id, data.files);
        }
      );

    Observable.combineLatest(
      downloading ? Observable.of(downloading) : Observable.fromPromise(this.downloaderService.download(file)),
      this.filesApi.getOne(file._id)
    ).subscribe(([downloadingFile, fileInfo]) => {
      if (!downloading) this.store.dispatch(new DownloaderActions.AddDownloadFile(downloadingFile))
      this.store.dispatch(new PlayerActions.PlayFile(downloadingFile, (<IFile>fileInfo).encryption_key.data, file.size));
      this.router.navigate(['player']);
    })
  }

  constructor(
    private store: Store<AppState>,
    private filesApi: FilesService,
    private uploaderService: UploaderService,
    private downloaderService: DownloaderService,
    private router: Router
  ) {}
}
