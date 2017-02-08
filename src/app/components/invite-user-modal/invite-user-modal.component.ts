import { validateEmail } from '../../utils/form-validators/email.validator';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ax-invite-user-modal',
  templateUrl: './invite-user-modal.component.html',
  styleUrls: ['./invite-user-modal.component.scss']
})
export class InviteUserModalComponent implements OnInit {
  opened = false;
  email: string;

  inviteForm: FormGroup;

  @Output('onFinished') onFinished: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]]
    });
  }

  open () {
    this.opened = true;
  }

  submit () {
    // @todo: dispatch action from here, check errors of email already exists ?
    this.onFinished.emit(this.email);
  }

}
