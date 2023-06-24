import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ClassesCreateUpdateActionComponent } from '../classes-create-update-action/classes-create-update-action.component';
import { ClassesDeleteActionComponent } from '../classes-delete-action/classes-delete-action.component';
import { ClassesTableComponent } from '../classes-table/classes-table.component';
import { ClassesComponent } from './classes.component';

describe('ClassesComponent', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClassesComponent,
        ClassesCreateUpdateActionComponent,
        ClassesDeleteActionComponent,
        ClassesTableComponent,
      ],
      imports: [MatDialogModule, MatTableModule],
    });
    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
