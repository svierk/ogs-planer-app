import { Component } from '@angular/core';
import { CoursesTableComponent } from '../courses-table/courses-table.component';

@Component({
  selector: 'ogs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
  imports: [CoursesTableComponent],
})
export class CoursesComponent {}
