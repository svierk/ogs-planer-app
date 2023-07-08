import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Class } from 'src/app/models/class';
import { ClassNamePipe } from 'src/app/pipes/class-name.pipe';
import { DbService } from 'src/app/services/db.service';
import { SearchService } from 'src/app/services/search.service';
import { Child } from '../../models/child';

@Component({
  selector: 'ogs-children-table',
  templateUrl: './children-table.component.html',
  styleUrls: ['./children-table.component.scss'],
  providers: [ClassNamePipe],
})
export class ChildrenTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  children: Child[] = [];
  classes: Class[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'classId', 'actions'];
  dataSource!: MatTableDataSource<Child>;

  constructor(
    private dbService: DbService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dbService.children.subscribe((value) => {
      this.children = value;
      this.dataSource = new MatTableDataSource(this.children);
      this.sortData({ active: 'firstName', direction: 'asc' });
      this.cdr.detectChanges();
    });
    this.dbService.classes.subscribe((value) => {
      this.classes = value;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  search(event: Event) {
    this.dataSource = this.searchService.search(event, this.dataSource);
  }

  sortData(sort: Sort) {
    this.dataSource = this.searchService.sort(sort, this.dataSource);
    this.dataSource.sort = this.sort;
  }
}
