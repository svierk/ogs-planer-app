import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenDeleteDialogComponent } from './children-delete-dialog.component';

describe('ChildrenDeleteDialogComponent', () => {
  let component: ChildrenDeleteDialogComponent;
  let fixture: ComponentFixture<ChildrenDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenDeleteDialogComponent],
    });
    fixture = TestBed.createComponent(ChildrenDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
