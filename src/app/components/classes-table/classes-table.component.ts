import { Component } from '@angular/core';
import { Days } from 'src/app/models/days';
import { Class } from '../../models/class';

@Component({
  selector: 'ogs-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss'],
})
export class ClassesTableComponent {
  Days = Days;

  classes: Class[] = [];
  displayedColumns: string[] = ['name', 'mascot', 'teacher'];
}
