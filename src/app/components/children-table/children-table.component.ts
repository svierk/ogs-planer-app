import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Days } from 'src/app/models/days';
import { DbService } from 'src/app/services/db.service';
import { Child } from '../../models/child';

@Component({
  selector: 'ogs-children-table',
  templateUrl: './children-table.component.html',
  styleUrls: ['./children-table.component.scss'],
})
export class ChildrenTableComponent implements OnInit {
  Days = Days;

  children: Child[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'phone'];

  constructor(private dbService: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dbService.children.subscribe((value) => {
      this.children = value;
      this.cdr.detectChanges();
    });
  }

  addChild() {
    this.dbService.addChild();
    this.dbService.getAllChildren();
  }
}
