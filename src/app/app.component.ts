import { Component, OnInit } from '@angular/core';
import { DbService } from './services/db.service';

@Component({
  selector: 'ogs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ogs-planer-app';

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.dbService.getAllChildren();
  }
}
