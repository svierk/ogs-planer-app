import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Class } from '../../models/class';

@Component({
  selector: 'ogs-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss'],
})
export class ClassesTableComponent implements OnInit {
  classes: Class[] = [];
  displayedColumns: string[] = ['name', 'teacher', 'actions'];

  constructor(private dbService: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dbService.classes.subscribe((value) => {
      this.classes = value;
      this.cdr.detectChanges();
    });
  }
}
