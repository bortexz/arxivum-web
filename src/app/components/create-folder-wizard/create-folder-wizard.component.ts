import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  folderForm: FormGroup;

  finished = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.folderForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onFinish () {
    this.onFinished.emit({
      folder: this.folderForm.value
    });
    this.finished = true;
  }

  open () {
    this.wizard.open();
    // We reset if the previous one was finished. Not otherwise, so we keep
    // user progress in case wizard is dismissed unintentionally
    if (this.finished) {
      this.finished = false;
      this.folderForm.reset();
    }
  }
}
