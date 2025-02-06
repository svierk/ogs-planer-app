import { Component, OnInit } from '@angular/core';
import { DbService } from './services/db.service';

@Component({
  selector: 'ogs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'ogs-planer-app';

  constructor(readonly dbService: DbService) {}

  ngOnInit() {
    this.dbService.getChildren();
    this.dbService.getClasses();
    this.dbService.getCourses();
    this.dbService.getEarlyCare();
    this.dbService.getLunch();
    this.dbService.getHomework();
    this.dbService.getChildCourses();
    this.dbService.getPickup();
  }
}
