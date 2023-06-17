import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCreateUpdateDialogComponent } from './courses-create-update-dialog.component';

describe('CoursesCreateUpdateDialogComponent', () => {
  let component: CoursesCreateUpdateDialogComponent;
  let fixture: ComponentFixture<CoursesCreateUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesCreateUpdateDialogComponent],
    });
    fixture = TestBed.createComponent(CoursesCreateUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
