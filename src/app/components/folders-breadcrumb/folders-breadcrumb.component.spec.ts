/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { FoldersBreadcrumbComponent } from './folders-breadcrumb.component';

fdescribe('FoldersBreadcrumbComponent', () => {
  let component: FoldersBreadcrumbComponent;
  let fixture: ComponentFixture<FoldersBreadcrumbComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldersBreadcrumbComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersBreadcrumbComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display only Arxivum if the path is empty', () => {
    const items = element.querySelectorAll('.folders-breadcrumb-item');
    expect(items.length).toBe(1);
    expect(items[0].innerText).toBe('Arxivum');
  });

  it('And should not be a link', () => {
    const items = element.querySelectorAll('.folders-breadcrumb-item');
    component.path = Observable.of([]);
    fixture.detectChanges();
    expect(items[0].children[0].tagName).not.toBe('A');
  });

  it('Should display the path when more elements are on the path', () => {
    component.path = Observable.of([{
      _id: '1',
      name: 'Folder 1'
    }, {
      _id: '2',
      name: 'Folder 2'
    }]);
    fixture.detectChanges();

    const items = element.querySelectorAll('.folders-breadcrumb-item');

    expect(items.length).toBe(3);
    expect(items[1].innerText).toBe('Folder 1');
    expect(items[2].innerText).toBe('Folder 2');
  });

  it('All the elements should be links except the last one, that should be SPAN', () => {
    component.path = Observable.of([{
      _id: '1',
      name: 'Folder 1'
    }, {
      _id: '2',
      name: 'Folder 2'
    }]);
    fixture.detectChanges();

    const items = element.querySelectorAll('.folders-breadcrumb-item');

    expect(items.length).toBe(3);
    items.forEach((item, idx) => {
      let expected;

      // first children for root, second for
      // others due to clr-icon
      let childrenPos = idx === 0 ? 0 : 1;

      if (idx === (items.length - 1)) {
        expected = 'SPAN';
      } else {
        expected = 'A';
      }

      expect(item.children[childrenPos].tagName).toBe(expected);
    });
  });

});
