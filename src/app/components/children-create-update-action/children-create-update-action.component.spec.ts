import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenCreateUpdateActionComponent } from './children-create-update-action.component';

describe('ChildrenCreateUpdateActionComponent', () => {
  let component: ChildrenCreateUpdateActionComponent;
  let fixture: ComponentFixture<ChildrenCreateUpdateActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenCreateUpdateActionComponent],
    });
    fixture = TestBed.createComponent(ChildrenCreateUpdateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
