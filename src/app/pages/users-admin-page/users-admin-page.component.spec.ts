/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersAdminPageComponent } from './users-admin-page.component';

describe('UsersAdminPageComponent', () => {
  let component: UsersAdminPageComponent;
  let fixture: ComponentFixture<UsersAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
