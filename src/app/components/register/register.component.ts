import { UsersActions } from '../../core/users/users.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { validateEmail } from '../../utils/form-validators/email.validator';
import { matchPasswords } from '../../utils/form-validators/match-passwords.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private usersActions: UsersActions
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [
        this.activatedRoute.snapshot.queryParams['email'] || '',
        [
          Validators.required,
          validateEmail
        ]
      ],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      token: [
        this.activatedRoute.snapshot.queryParams['token'] || '',
        Validators.required
      ]
    }, {
      validator: matchPasswords('password', 'repeat_password')
    });
  }

  submit () {
    this.store.dispatch(this.usersActions.register(this.registerForm.value));
  }
 }
