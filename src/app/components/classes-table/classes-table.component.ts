import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Class } from 'src/app/models/class';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'ogs-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss'],
})
export class ClassesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  classes: Class[] = [];
  displayedColumns: string[] = ['name', 'teacher', 'actions'];
  dataSource!: MatTableDataSource<Class>;

  constructor(
    private dbService: DbService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dbService.classes.subscribe((value) => {
      this.classes = value;
      this.dataSource = new MatTableDataSource(this.classes);
      this.sortData({ active: 'name', direction: 'asc' });
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'teacher':
          return this.compare(a.teacher as string, b.teacher as string, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
