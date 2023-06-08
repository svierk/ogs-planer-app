import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenUpdateActionComponent } from './children-update-action.component';

describe('ChildrenUpdateActionComponent', () => {
  let component: ChildrenUpdateActionComponent;
  let fixture: ComponentFixture<ChildrenUpdateActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenUpdateActionComponent],
    });
    fixture = TestBed.createComponent(ChildrenUpdateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
