import { LoginPageService } from './login-page.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ax-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private loginPageService: LoginPageService) { }
}
