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
import { Child } from 'src/app/models/child';
import { ChildrenCreateUpdateActionComponent } from '../children-create-update-action/children-create-update-action.component';
import { ChildrenDeleteActionComponent } from '../children-delete-action/children-delete-action.component';
import { ChildrenTableComponent } from './children-table.component';

const children: Child[] = [{ id: 123, firstName: 'test', lastName: 'child', classId: '123' }];

describe('ChildrenTableComponent', () => {
  let component: ChildrenTableComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<ChildrenTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenCreateUpdateActionComponent, ChildrenDeleteActionComponent, ChildrenTableComponent],
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
    fixture = TestBed.createComponent(ChildrenTableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow search', () => {
    // given
    component.children = children;
    component.dataSource = new MatTableDataSource(children);

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
    component.children = children;
    component.dataSource = new MatTableDataSource(children);

    // when
    component.sortData({ active: 'firstName', direction: 'asc' } as Sort);
    fixture.detectChanges();

    // then
    expect(component.sort.active).toEqual('firstName');
    expect(component.sort.direction).toEqual('asc');
  });
});
