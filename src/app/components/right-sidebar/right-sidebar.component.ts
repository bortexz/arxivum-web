import { DownloaderActions } from '../../core/downloader/downloader.actions';
import { IDownloadingFile } from '../../core/downloader/downloader.reducer';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { DownloaderService } from '../../core/downloader/downloader.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UploaderService } from '../../core/uploader/uploader.service';

@Component({
  selector: 'ax-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent implements OnInit {
  shown: string = null;

  uploading$ = this.store.select(state => state.uploading);
  downloading$ = this.store.select(state => state.downloading);

  shouldDisplay$ = Observable
    .combineLatest(this.uploading$, this.downloading$)
    .map(([uploading, downloading]) => {
      if (uploading && uploading.files.length > 0) return true;
      if (downloading && downloading.files.length > 0) return true;
      return false;
    });

  uploaderBadge$ = this.uploading$
    .map(uploading => uploading.progress)
    .map(progress => progress === 100 ? 'badge-success' : 'badge-orange');

  downloaderBadge$ = this.downloading$
    .map(downloading => {
      return ((downloading.progress === 100) ||
        (downloading.progress === 0)) &&
        downloading.files.length > 0 ?
        'badge-success' :
        'badge-orange';
    });

  constructor(
    private store: Store<AppState>,
    private downloaderService: DownloaderService,
    private downloaderActions: DownloaderActions
  ) {

  }

  ngOnInit() {}

  toggle(panel) {
    if (!this.shown) return this.shown = panel;

    if (this.shown === panel) {
      return this.shown = null;
    } else return this.shown = panel;
  }
}
