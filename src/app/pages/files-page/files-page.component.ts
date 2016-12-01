import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateFolderWizardComponent } from '../../wizards/create-folder-wizard/create-folder-wizard.component';
import { FoldersService } from '../../services/folders/folders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ax-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {
  public childFiles: Array<any>;
  public childFolders: Array<any>;

  @ViewChild('wizard') wizard: CreateFolderWizardComponent;

  constructor(private foldersService: FoldersService, private route: ActivatedRoute) {};

  ngOnInit() {
    this.childFiles = this.route.snapshot.data['folder']['files'];
    this.childFolders = this.route.snapshot.data['folder']['childFolders'];
  }

  wizardCreateFolderFinished (data) {
    this.foldersService
      .create(data.folder)
      .switchMap(res => this.foldersService.getAll())
      .map(res => res.childFolders)
      .subscribe(res => this.childFolders = res, err => { // TODO : Error handler
        console.log(err);
      });
  }

}
