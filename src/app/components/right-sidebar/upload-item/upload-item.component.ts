import { AppState } from '../../../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ax-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadItemComponent implements OnInit {

  @Input('file') file;

  progress$: Observable<number>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.progress$ = this.store.select(state => state.uploadData).map(state => {
      return state.get(this.file);
    }).distinctUntilChanged();
  }

}
