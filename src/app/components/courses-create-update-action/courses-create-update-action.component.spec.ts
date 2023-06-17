import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCreateUpdateActionComponent } from './courses-create-update-action.component';

describe('CoursesCreateUpdateActionComponent', () => {
  let component: CoursesCreateUpdateActionComponent;
  let fixture: ComponentFixture<CoursesCreateUpdateActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesCreateUpdateActionComponent],
    });
    fixture = TestBed.createComponent(CoursesCreateUpdateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
