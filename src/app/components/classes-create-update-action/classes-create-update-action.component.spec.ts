import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesCreateUpdateActionComponent } from './classes-create-update-action.component';

describe('ClassesCreateUpdateActionComponent', () => {
  let component: ClassesCreateUpdateActionComponent;
  let fixture: ComponentFixture<ClassesCreateUpdateActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesCreateUpdateActionComponent],
    });
    fixture = TestBed.createComponent(ClassesCreateUpdateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
