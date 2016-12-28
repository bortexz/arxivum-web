import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateFolderWizardComponent } from '../../wizards/create-folder-wizard/create-folder-wizard.component';
import { FoldersService } from '../../services/folders/folders.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { FileUploaderService } from '../../services/file-uploader/file-uploader.service';
import { FileDownloaderService } from '../../services/file-downloader/file-downloader.service';

@Component({
  selector: 'ax-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {
  public childFiles: Observable<Array<any>>;
  public childFolders: Observable<Array<any>>;
  public folderInfo: any;
  public path: Observable<Array<any>>;
  public hasBaseDropZoneOver: boolean = false;

  @ViewChild('wizard') wizard: CreateFolderWizardComponent;

  constructor(
    private foldersService: FoldersService,
    private route: ActivatedRoute,
    public fileUploaderService: FileUploaderService,
    public fileDownloaderService: FileDownloaderService
  ) {
  };

  /**
   * Function that reloads data, in case it has changed.
   */
  private reload (params?) {
    params = params || this.route.snapshot.params;
    const observable = this.foldersService.getOne(params['id']).share();

    this.childFolders = observable.map(res => res.childFolders);
    this.childFiles = observable.map(res => res.files);
    this.path = observable.map(res => {
      let path = [...res.ancestors];
      if (res._id) {
        path.push({_id: res._id, name: res.name});
      }
      return path;
    });

    observable.subscribe(res => {
      this.folderInfo = res;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reload(params);
    });

    this.fileUploaderService.onSuccess.subscribe(() => this.reload());
  }

  public wizardCreateFolderFinished (data) {
    const currentFolder = this.route.snapshot.params['id'];
    data.folder.parent = currentFolder;
    this.childFolders = this.foldersService
      .create(data.folder)
      .switchMap(res => this.foldersService.getOne(currentFolder))
      .map(res => res.childFolders)
      .share() // 2 Subscribers in html, needed to only execute once.
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      });
  }

  public uploadFiles () {
    this.fileUploaderService.uploadAll(
      this.folderInfo && this.folderInfo._id ?
      {folder: this.folderInfo._id} :
      undefined
    );
  }

  public downloadFile (file) {
    this.fileDownloaderService.download(file);
  }

  public fileOverDragArea (e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
