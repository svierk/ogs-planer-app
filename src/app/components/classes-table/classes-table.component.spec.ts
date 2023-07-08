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
import { Class } from 'src/app/models/class';
import { ClassesCreateUpdateActionComponent } from '../classes-create-update-action/classes-create-update-action.component';
import { ClassesDeleteActionComponent } from '../classes-delete-action/classes-delete-action.component';
import { ClassesTableComponent } from './classes-table.component';

const classes: Class[] = [
  { id: 123, name: '1a' },
  { id: 456, name: '1b' },
];

describe('ClassesTableComponent', () => {
  let component: ClassesTableComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<ClassesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesCreateUpdateActionComponent, ClassesDeleteActionComponent, ClassesTableComponent],
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
    fixture = TestBed.createComponent(ClassesTableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow search', () => {
    // given
    component.classes = classes;
    component.dataSource = new MatTableDataSource(classes);

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
    component.classes = classes;
    component.dataSource = new MatTableDataSource(classes);

    // when
    component.sortData({ active: 'default', direction: '' } as Sort);
    fixture.detectChanges();
    component.sortData({ active: 'teacher', direction: 'desc' } as Sort);
    fixture.detectChanges();
    component.sortData({ active: 'name', direction: 'asc' } as Sort);
    fixture.detectChanges();

    // then
    expect(component.sort.active).toEqual('name');
    expect(component.sort.direction).toEqual('asc');
  });
});
