import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenCreateUpdateDialogComponent } from './children-create-update-dialog.component';

describe('ChildrenCreateUpdateDialogComponent', () => {
  let component: ChildrenCreateUpdateDialogComponent;
  let fixture: ComponentFixture<ChildrenCreateUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenCreateUpdateDialogComponent],
    });
    fixture = TestBed.createComponent(ChildrenCreateUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
