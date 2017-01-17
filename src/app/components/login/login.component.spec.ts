/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { LoginComponent } from './login.component';

import { Observable } from 'rxjs';

class MockAuthService {
  login (user, password) {
    return Observable.of({
      user,
      password
    });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthenticationService, useClass: MockAuthService}
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should execute on submit if input submit clicked', () => {
    spyOn(component, 'onSubmit');
    element.querySelector('input[type=submit]').click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('onSubmit should call authservice login with user and password', () => {
    spyOn(component.authentication, 'login').and.callThrough();
    spyOn(component, 'onLoginSuccess'); // Prevent it from being called
    component.user = 'test';
    component.password = 'test';
    component.onSubmit();
    expect(component.authentication.login).toHaveBeenCalledTimes(1);
    expect(component.authentication.login).toHaveBeenCalledWith('test', 'test');
  });

  it('Should call on login success when successful login', () => {
    spyOn(component, 'onLoginSuccess'); // Prevent it from being called
    component.onSubmit();
    expect(component.onLoginSuccess).toHaveBeenCalledTimes(1);
  });

  it('Should navigate to /folder if login success', () => {
    spyOn(component.router, 'navigate');
    component.onSubmit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/folder']);
  });

  it('Should bind user and password to the inputs', async(() => {
    component.user = 'test';
    component.password = 'test';

    const user = element.querySelector('input[type=text]');
    const password = element.querySelector('input[type=password]');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(user.value).toBe(component.user);
      expect(password.value).toBe(component.password);
    });
  }));

  // Handle login error later.
});
