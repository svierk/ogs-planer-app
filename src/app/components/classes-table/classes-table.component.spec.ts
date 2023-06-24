import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ClassesTableComponent } from './classes-table.component';

describe('ClassesTableComponent', () => {
  let component: ClassesTableComponent;
  let fixture: ComponentFixture<ClassesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesTableComponent],
      imports: [MatTableModule],
    });
    fixture = TestBed.createComponent(ClassesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
