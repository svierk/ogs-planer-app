import { ChangeDetectorRef, Component } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'ogs-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
})
export class ChildrenComponent {
  constructor(private dbService: DbService, private cdr: ChangeDetectorRef) {}

  createChild() {
    this.dbService.createChild({ firstName: 'Test', lastName: 'Child' });
    this.dbService.getChildren();
  }
}
