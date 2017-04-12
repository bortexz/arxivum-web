import { ModalsActions } from '../../core/modals/modals.actions';
import { NameFormModalComponent } from '../../components/modals/name-form-modal/name-form-modal.component';
import { FilesActions } from '../../core/files/files.actions';
import { FolderTreeActions } from '../../core/folders/tree/tree.actions';
import { AppState } from '../../app.reducers';
import { DownloaderActions } from '../../core/downloader/downloader.actions';
import { IDownloadingFile } from '../../core/downloader/downloader.reducer';
import { DownloaderService } from '../../core/downloader/downloader.service';
import { FoldersActions } from '../../core/folders/folders.actions';
import { UploaderActions } from '../../core/uploader/uploader.actions';
import { UploaderService } from '../../core/uploader/uploader.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ax-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesPageComponent implements OnInit, AfterViewInit {

  private currentFolder$ = this.store.select(state => state.currentFolder);
  private authenticated$ = this.store.select(state => state.authenticated);
  private downloadData$ = this.store.select(state => state.downloadData);
  private tree$ = this.store.select(state => state.folderTree.tree);
  private nameFormModal$ = this.store.select(state => state.modals.nameForm);

  private hasBaseDropZoneOver = false;

  private selected = null;

  @ViewChild('sidenav') sidenav;

  /**
   * Styling properties.
   * @todo : Look for a pure CSS solution, if possible.
   * Keeps the size of the breadcrumb in sync with sidenav width
   */
  @ViewChild('subnavRightButtons') subnavRightButtons;

  // Values being pushed through events in html.
  sidenavWidth$: Subject<number> = new Subject();

  breadcrumbSize$ = this.sidenavWidth$.map(px => {
    let size = window.innerWidth - px;
    if (this.subnavRightButtons) {
      size -= this.subnavRightButtons.nativeElement.offsetWidth;
    }
    return size;
  });
  /**
   * End styling properties
   */

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public uploaderService: UploaderService,
    public downloaderService: DownloaderService,
    private store: Store<AppState>,
    private foldersActions: FoldersActions,
    private uploaderActions: UploaderActions,
    private downloaderActions: DownloaderActions,
    private folderTreeActions: FolderTreeActions,
    private filesActions: FilesActions,
    private modalsActions: ModalsActions
  ) {
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(this.foldersActions.getFolder(params['id']));
    });

    this.store.dispatch(this.folderTreeActions.getTree());
  }

  ngAfterViewInit() {
    this.sidenavWidth$.next(this.sidenav.nativeElement.offsetWidth);
  }

  newFolder () {
    this.store.dispatch(this.modalsActions.newFolder());
  }

  downloadFile (file) {
    this.store.dispatch(this.downloaderActions.downloadFile(file));
  }

  removeFile (id) {
    this.store.dispatch(this.filesActions.remove(id));
  }

  editFile (file) {
    this.store.dispatch(this.modalsActions.updateFileName(file));
  }

  /**
   *  @todo also stream$ ?
   */
  public select (item, $event) {
    this.selected = item;
    if ($event) {
      $event.stopPropagation();
    }
  }

  public fileOverDragArea (e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
