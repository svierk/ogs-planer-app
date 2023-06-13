import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class';
import { ClassNamePipe } from 'src/app/pipes/class-name.pipe';
import { DbService } from 'src/app/services/db.service';
import { Child } from '../../models/child';

@Component({
  selector: 'ogs-children-table',
  templateUrl: './children-table.component.html',
  styleUrls: ['./children-table.component.scss'],
  providers: [ClassNamePipe],
})
export class ChildrenTableComponent implements OnInit {
  children: Child[] = [];
  classes: Class[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'classId', 'actions'];

  constructor(private dbService: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dbService.children.subscribe((value) => {
      this.children = value;
      this.cdr.detectChanges();
    });
    this.dbService.classes.subscribe((value) => {
      this.classes = value;
      this.cdr.detectChanges();
    });
  }
}
