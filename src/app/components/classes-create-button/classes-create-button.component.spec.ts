import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesCreateButtonComponent } from './classes-create-button.component';

describe('ClassesCreateButtonComponent', () => {
  let component: ClassesCreateButtonComponent;
  let fixture: ComponentFixture<ClassesCreateButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesCreateButtonComponent],
    });
    fixture = TestBed.createComponent(ClassesCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
