/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';
import { HeaderComponent } from './header.component';

class MockAuthServiceLogged extends AuthenticationService {
  user = {email: 'test'};
}

class MockAuthServiceNotLogged extends AuthenticationService {
  user = null;
}

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: any;

  describe('when logged out', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          {provide: AuthenticationService, useClass: MockAuthServiceNotLogged}
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should not display cloud icon', () => {
      expect(element.querySelector('a#root-folder-link')).toBeNull();
    });
    it('Should display login link', () => {
      expect(element.querySelector('a#login-link')).toBeDefined();
    });
  });

  describe('when logged in', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          {provide: AuthenticationService, useClass: MockAuthServiceLogged}
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should display cloud icon', () => {
      expect(element.querySelector('a#root-folder-link')).toBeDefined();
    });

    it('Should not display login link', () => {
      expect(element.querySelector('a#login-link')).toBeNull();
    });
  });
});
