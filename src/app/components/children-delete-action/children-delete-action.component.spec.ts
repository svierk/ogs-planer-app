import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenDeleteActionComponent } from './children-delete-action.component';

describe('ChildrenDeleteActionComponent', () => {
  let component: ChildrenDeleteActionComponent;
  let fixture: ComponentFixture<ChildrenDeleteActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenDeleteActionComponent],
    });
    fixture = TestBed.createComponent(ChildrenDeleteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
