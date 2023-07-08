import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChildrenActivitiesActionComponent } from '../children-activities-action/children-activities-action.component';
import { ChildrenCreateUpdateActionComponent } from '../children-create-update-action/children-create-update-action.component';
import { ChildrenDeleteActionComponent } from '../children-delete-action/children-delete-action.component';
import { ChildrenTableComponent } from '../children-table/children-table.component';
import { ChildrenComponent } from './children.component';

describe('ChildrenComponent', () => {
  let component: ChildrenComponent;
  let fixture: ComponentFixture<ChildrenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChildrenComponent,
        ChildrenActivitiesActionComponent,
        ChildrenCreateUpdateActionComponent,
        ChildrenDeleteActionComponent,
        ChildrenTableComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
      ],
    });
    fixture = TestBed.createComponent(ChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
