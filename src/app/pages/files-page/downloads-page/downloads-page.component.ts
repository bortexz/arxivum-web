import { FilesPageService } from '../files-page.service';
import { AppState } from '../../../app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

const R = require('ramda');

@Component({
  selector: 'ax-downloads-page',
  templateUrl: './downloads-page.component.html',
  styleUrls: ['./downloads-page.component.scss']
})
export class DownloadsPageComponent implements OnInit {
  constructor(
    public filesPageService: FilesPageService
  ) { }

  ngOnInit() {
  }

}
