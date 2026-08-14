import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenTableComponent } from '../children-table/children-table.component';

@Component({
  selector: 'ogs-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ChildrenTableComponent],
})
export class ChildrenComponent {}
