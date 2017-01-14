import { UploaderActions } from '../../services/uploader/uploader.actions';
import { FoldersActions } from '../../services/folders/folders.actions';
import { AppState } from '../../app.reducers';

import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateFolderWizardComponent } from '../../components/create-folder-wizard/create-folder-wizard.component';
import { FoldersService } from '../../services/folders/folders.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { UploaderService } from '../../services/uploader/uploader.service';
import { FileDownloaderService } from '../../services/file-downloader/file-downloader.service';

@Component({
  selector: 'ax-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {

  private currentFolder$ = this.store.select(state => state.currentFolder);
  private authenticated$ = this.store.select(state => state.authenticated);

  private hasBaseDropZoneOver: boolean = false;

  public selected = null;
  @ViewChild('wizard') wizard: CreateFolderWizardComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public uploaderService: UploaderService,
    public fileDownloaderService: FileDownloaderService,
    private store: Store<AppState>,
    private foldersActions: FoldersActions,
    private uploaderActions: UploaderActions
  ) {

  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(this.foldersActions.getFolder(params['id']));
    });
  }

  public wizardCreateFolderFinished (data) {
    const currentFolder = this.route.snapshot.params['id'];
    data.folder.parent = currentFolder;

    this.store.dispatch(this.foldersActions.createFolder(data.folder));
  }

  public uploadFiles () {
    this.store.dispatch(this.uploaderActions.uploadFiles());
  }

  public select (item, $event) {
    this.selected = item;
    if ($event) {
      $event.stopPropagation();
    }
  }

  public navigate (item) {
    this.router.navigate(['/folder', {id: item._id}]);
  }

  public downloadFile (file) {
    this.fileDownloaderService.download(file);
  }

  public fileOverDragArea (e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
