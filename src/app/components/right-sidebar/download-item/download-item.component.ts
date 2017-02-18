import { DownloaderActions } from '../../../core/downloader/downloader.actions';
import { Observable } from 'rxjs/Rx';
import { DownloadDataItem } from '../../../core/downloader/download-data/download-data.reducer';
import { AppState } from '../../../app.reducers';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ax-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadItemComponent implements OnInit {

  @Input('file') file;

  downloadData$: Observable<DownloadDataItem>;

  constructor(
    private store: Store<AppState>,
    private downloaderActions: DownloaderActions
  ) { }

  ngOnInit() {
    this.downloadData$ = this.store.select(state => state.downloadData)
      .filter(data => !!(data && data[this.file._id]))
      .map(data => data[this.file._id])
      .distinctUntilChanged();
  }

}
