import { validateEmail } from '../../../utils/form-validators/email.validator';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ax-invite-user-modal',
  templateUrl: './invite-user-modal.component.html',
  styleUrls: ['./invite-user-modal.component.scss']
})
export class InviteUserModalComponent implements OnInit {
  opened = false;

  inviteForm: FormGroup;

  @Output('onFinished') onFinished: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]]
    });
  }

  open () {
    this.inviteForm.reset();
    this.opened = true;
  }

  submit () {
    this.onFinished.emit(this.inviteForm.value.email);
    this.opened = false;
  }

}
