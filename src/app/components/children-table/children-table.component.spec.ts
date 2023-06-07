import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenTableComponent } from './children-table.component';

describe('ChildrenTableComponent', () => {
  let component: ChildrenTableComponent;
  let fixture: ComponentFixture<ChildrenTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenTableComponent],
    });
    fixture = TestBed.createComponent(ChildrenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
