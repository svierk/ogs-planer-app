import { Component } from '@angular/core';
import { ClassesTableComponent } from '../classes-table/classes-table.component';

@Component({
    selector: 'ogs-classes',
    templateUrl: './classes.component.html',
    styleUrls: ['./classes.component.scss'],
    standalone: true,
    imports: [ClassesTableComponent],
})
export class ClassesComponent {}
