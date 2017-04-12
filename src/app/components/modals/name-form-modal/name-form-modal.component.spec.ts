import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameFormModalComponent } from './name-form-modal.component';

describe('NameFormModalComponent', () => {
  let component: NameFormModalComponent;
  let fixture: ComponentFixture<NameFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
