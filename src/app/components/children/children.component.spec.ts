import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenComponent } from './children.component';

describe('ChildrenComponent', () => {
  let component: ChildrenComponent;
  let fixture: ComponentFixture<ChildrenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenComponent],
    });
    fixture = TestBed.createComponent(ChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
