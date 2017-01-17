import { IDownloadingFile } from '../../core/downloader/downloader.reducer';
import { DownloaderActions } from '../../core/downloader/downloader.actions';
import { UploaderActions } from '../../core/uploader/uploader.actions';
import { FoldersActions } from '../../core/folders/folders.actions';
import { AppState } from '../../app.reducers';

import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateFolderWizardComponent } from '../../components/create-folder-wizard/create-folder-wizard.component';
import { FoldersService } from '../../core/folders/folders.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { UploaderService } from '../../core/uploader/uploader.service';
import { DownloaderService } from '../../core/downloader/downloader.service';

@Component({
  selector: 'ax-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {

  private currentFolder$ = this.store.select(state => state.currentFolder);
  private authenticated$ = this.store.select(state => state.authenticated);
  private downloading$ = this.store.select(state => state.downloading);

  private hasBaseDropZoneOver: boolean = false;

  private selected = null;
  @ViewChild('wizard') wizard: CreateFolderWizardComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public uploaderService: UploaderService,
    public downloaderService: DownloaderService,
    private store: Store<AppState>,
    private foldersActions: FoldersActions,
    private uploaderActions: UploaderActions,
    private downloaderActions: DownloaderActions,
    private changeDetector: ChangeDetectorRef
  ) {
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(this.foldersActions.getFolder(params['id']));
    });

    this.downloading$.subscribe(() => this.changeDetector.detectChanges());
  }

  public wizardCreateFolderFinished (data) {
    const currentFolder = this.route.snapshot.params['id'];
    data.folder.parent = currentFolder;

    this.store.dispatch(this.foldersActions.createFolder(data.folder));
  }

  public fileDownloading (id): Observable<IDownloadingFile> {
    return this.downloading$
      .map(downloading => downloading.files)
      .map(files => files.find(elem => elem._id === id))
      .filter(file => !!file);

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

  public fileOverDragArea (e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
