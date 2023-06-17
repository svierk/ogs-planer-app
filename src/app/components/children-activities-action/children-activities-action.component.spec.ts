import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenActivitiesActionComponent } from './children-activities-action.component';

describe('ChildrenActivitiesActionComponent', () => {
  let component: ChildrenActivitiesActionComponent;
  let fixture: ComponentFixture<ChildrenActivitiesActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenActivitiesActionComponent],
    });
    fixture = TestBed.createComponent(ChildrenActivitiesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
