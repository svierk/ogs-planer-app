import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesUpdateActionComponent } from './classes-update-action.component';

describe('ClassesUpdateActionComponent', () => {
  let component: ClassesUpdateActionComponent;
  let fixture: ComponentFixture<ClassesUpdateActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesUpdateActionComponent],
    });
    fixture = TestBed.createComponent(ClassesUpdateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
