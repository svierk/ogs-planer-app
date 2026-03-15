import { Component, OnInit, inject } from '@angular/core';
import { DbService } from './services/db.service';
import { ToasterComponent } from './components/toaster/toaster.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'ogs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ToasterComponent, MatToolbar, MatAnchor, RouterLink, RouterLinkActive, RouterOutlet],
})
export class AppComponent implements OnInit {
  readonly dbService = inject(DbService);

  title = 'ogs-planer-app';

  ngOnInit() {
    this.dbService.getChildren();
    this.dbService.getClasses();
    this.dbService.getClassSchedules();
    this.dbService.getCourses();
    this.dbService.getEarlyCare();
    this.dbService.getLunch();
    this.dbService.getHomework();
    this.dbService.getChildCourses();
    this.dbService.getPickup();
  }
}
