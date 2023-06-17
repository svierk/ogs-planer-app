import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'ogs-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['name', 'teacher', 'day', 'time', 'note', 'actions'];

  constructor(private dbService: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dbService.courses.subscribe((value) => {
      this.courses = value;
      this.cdr.detectChanges();
    });
  }
}
