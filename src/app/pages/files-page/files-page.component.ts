import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {
  public files = [];

  constructor() { }

  ngOnInit() {
  }

}
