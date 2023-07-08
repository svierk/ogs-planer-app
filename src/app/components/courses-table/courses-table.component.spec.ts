import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { CoursesCreateUpdateActionComponent } from '../courses-create-update-action/courses-create-update-action.component';
import { CoursesDeleteActionComponent } from '../courses-delete-action/courses-delete-action.component';
import { CoursesTableComponent } from './courses-table.component';

const courses: Course[] = [
  {
    id: 123,
    name: 'course',
    teacher: 'teacher',
    day: Days.Monday,
    start: 'start',
    end: 'end',
  },
];

describe('CoursesTableComponent', () => {
  let component: CoursesTableComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<CoursesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesCreateUpdateActionComponent, CoursesDeleteActionComponent, CoursesTableComponent],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
      ],
    });
    fixture = TestBed.createComponent(CoursesTableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow search', () => {
    // given
    component.courses = courses;
    component.dataSource = new MatTableDataSource(courses);

    // when
    const input = debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    // then
    expect(component.dataSource.filter).toEqual('');
  });

  it('should allow sorting', () => {
    // given
    component.courses = courses;
    component.dataSource = new MatTableDataSource(courses);

    // when
    component.sortData({ active: 'name', direction: 'asc' } as Sort);
    fixture.detectChanges();

    // then
    expect(component.sort.active).toEqual('name');
    expect(component.sort.direction).toEqual('asc');
  });
});
