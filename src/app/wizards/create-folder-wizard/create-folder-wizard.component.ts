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

  finished = false;

  open () {
    this.wizard.open();
    // We reset if the previous one was finished. Not otherwise, so we keep
    // user progress in case wizard is dismissed unintentionally
    if (this.finished) {
      this.finished = false;
      this.folderInfoForm.form.reset();
    }
  }

  constructor() { }

  ngOnInit() {}

  onFinish () {
    this.onFinished.emit({
      folder: this.folder,
      invitations: this.invitations,
      files : this.files
    });
    this.finished = true;
  }
}
