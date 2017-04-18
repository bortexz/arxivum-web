import { UploaderActions } from '../../core/uploader/uploader.actions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { state, style, transition, trigger, animate } from '@angular/animations';
import { DownloadDataState } from '../../core/downloader/download-data/download-data.reducer';
import { UploaderState } from '../../core/uploader/uploader.reducer';
import { DownloaderActions } from '../../core/downloader/downloader.actions';
import { DownloaderState, IDownloadingFile } from '../../core/downloader/downloader.reducer';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { UploaderService } from '../../core/uploader/uploader.service';

@Component({
  selector: 'ax-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  animations: [
    trigger('displayed', [
      state('downloader', style({
        transform: 'translateX(-300px)'
      })),
      state('uploader', style({
        transform: 'translateX(-300px)'
      })),
      state('hidden',   style({
        transform: 'translateX(0px)'
      })),
      // transition('uploader => hidden', animate('250ms ease-in')),
      transition('* => hidden', animate('150ms ease-in')),
      transition('hidden => *', animate('150ms ease-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent implements OnInit {
  // Behavior subject to toggle different panels
  toggle$: BehaviorSubject<string>;

  // String that has the current panel shown, "hidden" otherwise
  shown$: Observable<string>;

  uploading$: Observable<UploaderState>;
  downloading$: Observable<DownloaderState>;
  downloadData$: Observable<DownloadDataState>;

  shouldDisplay$: Observable<Boolean>;

  // badge-success or badge-orange, depending on the progress state.
  uploaderBadge$: Observable<string>;
  downloaderBadge$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private downloaderActions: DownloaderActions,
    private uploaderActions: UploaderActions
  ) {}

  ngOnInit() {
    this.uploading$ = this.store.select(state => state.uploading);
    this.downloading$ = this.store.select(state => state.downloading);

    this.toggle$ = new BehaviorSubject('hidden');
    this.shown$ = this.toggle$
      .scan((prev, val) => {
        return prev === 'hidden' || prev !== val ? val : 'hidden';

        // if (prev === 'hidden') return val;
        // if (prev === val) {
        //   return 'hidden';
        // } else return val;
      }, 'hidden');

    this.shouldDisplay$ = Observable
      .combineLatest(this.uploading$, this.downloading$)
      .withLatestFrom(this.shown$)
      .map(([[uploading, downloading], shown]) => {
        // In case of clear, we retoggle to the other panel or hide
        if (shown === 'downloader' && downloading.files.length === 0) {
          if (uploading.files.length > 0) this.toggle$.next('uploader');
          else this.toggle$.next('hidden');
        }

        if (shown === 'uploader' && uploading.files.length === 0) {
          if (downloading.files.length > 0) this.toggle$.next('downloader');
          else this.toggle$.next('hidden');
        }

        // calculate should display
        if (uploading.files.length > 0 || downloading.files.length > 0) {
          return true;
        }
        return false;
      });

    this.uploaderBadge$ = this.uploading$
      .map(uploading => uploading.progress)
      .map(progress => progress === 100 ? 'badge-success' : 'badge-orange');

    this.downloaderBadge$ = this.downloading$
      .map(downloading => {
        return ((downloading.progress === 100) ||
          (downloading.progress === 0)) &&
          downloading.files.length > 0 ?
          'badge-success' :
          'badge-orange';
      });
  }

  clearUploads() {
    this.store.dispatch(this.uploaderActions.clearQueue());
  }

  toggle(panel) {
    this.toggle$.next(panel);
  }
}
