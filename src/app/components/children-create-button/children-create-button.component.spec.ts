import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenCreateButtonComponent } from './children-create-button.component';

describe('ChildrenCreateButtonComponent', () => {
  let component: ChildrenCreateButtonComponent;
  let fixture: ComponentFixture<ChildrenCreateButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenCreateButtonComponent],
    });
    fixture = TestBed.createComponent(ChildrenCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
