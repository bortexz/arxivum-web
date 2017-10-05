import { AppNotification } from '../../core/common/notifications.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subject } from 'rxjs/Rx';
import { UsersService } from '../../core/users/users.service';
import { matchPasswords } from '../../utils/form-validators/match-passwords.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-update-user-page',
  templateUrl: './update-user-page.component.html',
  styleUrls: ['./update-user-page.component.scss']
})
export class UpdateUserPageComponent implements OnInit {
  changePasswordForm
  error$ = new Subject();

  constructor(
    public fb: FormBuilder,
    public usersApi: UsersService,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      repeat_password: ['', Validators.required],
    }, {
      validator: matchPasswords('new_password', 'repeat_password')
    });
  }

  submit() {
    const { current_password, new_password } = this.changePasswordForm.value
    this.usersApi.changePassword(current_password, new_password).subscribe(
      data => {
        this.changePasswordForm.reset();
        this.store.dispatch(new AppNotification('Password updated'))
      },
      err => this.error$.next(err)
    )
  }

  closeError() {
    this.error$.next(null);
  }

}
