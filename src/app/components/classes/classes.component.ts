import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClassesTableComponent } from '../classes-table/classes-table.component';

@Component({
  selector: 'ogs-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ClassesTableComponent],
})
export class ClassesComponent {}
