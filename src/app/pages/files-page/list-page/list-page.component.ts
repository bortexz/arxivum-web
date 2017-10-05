import { AppState } from '../../../app.reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesPageService } from '../files-page.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ax-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private filesPageService: FilesPageService
  ) { }

  @ViewChild('inputfiles') inputfiles;

  private currentFolder$ = this.filesPageService.currentFolder$;
  private authenticated$ = this.filesPageService.authenticated$;
  // private downloadData$ = this.store.select(state => state.downloadData);

  private path$ = this.currentFolder$.pluck('path');
  private hasBaseDropZoneOver = false;

  folderLink (id) {
    this.router.navigate(['/files/list', { id }])
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filesPageService.goToFolder(params['id']);
    });

    // this.filesPageService.reloadTree();
  }

  public fileOverDragArea (e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  uploadPrompt () {
    this.inputfiles.nativeElement.click();
  }
}
