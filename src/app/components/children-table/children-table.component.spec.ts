import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ChildrenTableComponent } from './children-table.component';

describe('ChildrenTableComponent', () => {
  let component: ChildrenTableComponent;
  let fixture: ComponentFixture<ChildrenTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenTableComponent],
      imports: [MatTableModule],
    });
    fixture = TestBed.createComponent(ChildrenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
