import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {Wizard} from 'clarity-angular';

@Component({
  selector: 'ax-create-folder-wizard',
  templateUrl: './create-folder-wizard.component.html',
  styleUrls: ['./create-folder-wizard.component.scss']
})
export class CreateFolderWizardComponent implements OnInit {
  @Output('onFinished') onFinished: EventEmitter<any> = new EventEmitter();

  @ViewChild('wizard') wizard: Wizard;
  @ViewChild('folderInfoForm') folderInfoForm;

  folder: any = {};
  invitations: Array<any> = [];
  files: Array<File> = [];

  open () {
    this.wizard.open();
  }

  constructor() { }

  ngOnInit() {}

  onFinish () {
    this.onFinished.emit({
      folder: this.folder,
      invitations: this.invitations,
      files : this.files
    });
    this.folderInfoForm.form.reset();
  }
}
