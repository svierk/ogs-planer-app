import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
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
      imports: [MatDialogModule, MatTableModule],
    });
    fixture = TestBed.createComponent(ChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
