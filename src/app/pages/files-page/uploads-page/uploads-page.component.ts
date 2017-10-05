import { FilesPageService } from '../files-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-uploads-page',
  templateUrl: './uploads-page.component.html',
  styleUrls: ['./uploads-page.component.scss']
})
export class UploadsPageComponent implements OnInit {
  constructor(
    public filesPageService: FilesPageService
  ) { }

  ngOnInit() {
  }
}
