import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenActivitiesDialogComponent } from './children-activities-dialog.component';

describe('ChildrenActivitiesDialogComponent', () => {
  let component: ChildrenActivitiesDialogComponent;
  let fixture: ComponentFixture<ChildrenActivitiesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenActivitiesDialogComponent],
    });
    fixture = TestBed.createComponent(ChildrenActivitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
