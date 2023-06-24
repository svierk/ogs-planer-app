import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CoursesCreateUpdateActionComponent } from '../courses-create-update-action/courses-create-update-action.component';
import { CoursesDeleteActionComponent } from '../courses-delete-action/courses-delete-action.component';
import { CoursesTableComponent } from '../courses-table/courses-table.component';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        CoursesCreateUpdateActionComponent,
        CoursesDeleteActionComponent,
        CoursesTableComponent,
      ],
      imports: [MatDialogModule, MatTableModule],
    });
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
