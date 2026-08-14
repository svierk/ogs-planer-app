import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoursesTableComponent } from '../courses-table/courses-table.component';

@Component({
  selector: 'ogs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CoursesTableComponent],
})
export class CoursesComponent {}
