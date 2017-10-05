import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsPageComponent } from './uploads-page.component';

describe('UploadsPageComponent', () => {
  let component: UploadsPageComponent;
  let fixture: ComponentFixture<UploadsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
