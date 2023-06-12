import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesDeleteDialogComponent } from './classes-delete-dialog.component';

describe('ClassesDeleteDialogComponent', () => {
  let component: ClassesDeleteDialogComponent;
  let fixture: ComponentFixture<ClassesDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesDeleteDialogComponent],
    });
    fixture = TestBed.createComponent(ClassesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
