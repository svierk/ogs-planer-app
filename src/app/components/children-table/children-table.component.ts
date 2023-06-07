import { Component } from '@angular/core';
import { Days } from 'src/app/models/days';
import { Child } from '../../models/child';

@Component({
  selector: 'ogs-children-table',
  templateUrl: './children-table.component.html',
  styleUrls: ['./children-table.component.scss'],
})
export class ChildrenTableComponent {
  Days = Days;

  children: Child[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'phone'];
}
