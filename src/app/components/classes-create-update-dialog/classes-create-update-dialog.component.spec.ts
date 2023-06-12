import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesCreateUpdateDialogComponent } from './classes-create-update-dialog.component';

describe('ClassesCreateUpdateDialogComponent', () => {
  let component: ClassesCreateUpdateDialogComponent;
  let fixture: ComponentFixture<ClassesCreateUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesCreateUpdateDialogComponent],
    });
    fixture = TestBed.createComponent(ClassesCreateUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
