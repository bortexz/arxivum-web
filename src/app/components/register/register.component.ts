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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [
        this.activatedRoute.snapshot.queryParams['email'] || '',
        Validators.required
      ],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      token: [this.activatedRoute.snapshot.queryParams['token'] || '']
    });
  }

  submit () {
    console.log(this.registerForm.value, this.registerForm.valid);
  }
 }
