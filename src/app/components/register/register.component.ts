import { AppError } from '../../core/common/errors.actions';
import { LoginPageService } from '../../pages/login-page/login-page.service';
import { UsersService } from '../../core/users/users.service';
// import { UsersActions } from '../../core/users/users.actions';
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
    private usersApi: UsersService,
    private loginPageService: LoginPageService
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
    const {email, password} = this.registerForm.value;
    // this.store.dispatch(this.usersActions.register(this.registerForm.value));
    this.usersApi.register(this.registerForm.value).subscribe(
      () => this.loginPageService.login(email, password),
      err => this.store.dispatch(new AppError('Error while trying to register'))
    )
  }
 }
