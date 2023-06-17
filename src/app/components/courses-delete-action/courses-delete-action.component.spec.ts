import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDeleteActionComponent } from './courses-delete-action.component';

describe('CoursesDeleteActionComponent', () => {
  let component: CoursesDeleteActionComponent;
  let fixture: ComponentFixture<CoursesDeleteActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesDeleteActionComponent],
    });
    fixture = TestBed.createComponent(CoursesDeleteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
