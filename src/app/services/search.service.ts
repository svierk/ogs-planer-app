import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  search(event: Event, source: MatTableDataSource<any>): MatTableDataSource<any> {
    const filterValue = (event.target as HTMLInputElement).value;
    source.filter = filterValue?.trim().toLowerCase();

    return source;
  }

  sort(sort: Sort, source: MatTableDataSource<any>): MatTableDataSource<any> {
    const data = source.data;
    if (!sort.active || sort.direction === '') {
      source.data = data;
      return source;
    }

    source.data = data.toSorted((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });

    return source;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
