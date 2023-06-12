import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesDeleteActionComponent } from './classes-delete-action.component';

describe('ClassesDeleteActionComponent', () => {
  let component: ClassesDeleteActionComponent;
  let fixture: ComponentFixture<ClassesDeleteActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesDeleteActionComponent],
    });
    fixture = TestBed.createComponent(ClassesDeleteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
