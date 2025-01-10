import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { TableColumn, TableGetIdFn } from './table.component.types';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NotFoundPlaceholderComponent } from '../not-found-placeholder/not-found-placeholder.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NotFoundPlaceholderComponent,
    CommonModule,
  ],
})
export class TableComponent<RowObject extends object>
  implements OnInit, OnChanges
{
  @Input() rows: RowObject[] = [];
  @Input() columns: TableColumn<RowObject>[] = [];
  @Input() getId!: TableGetIdFn<RowObject>;
  @Input() searchable = false;
  @Input() actions?: TemplateRef<{ $implicit: RowObject }>;
  @Input() topRightSection?: TemplateRef<void>;

  searchValue = '';
  dataSource = new MatTableDataSource<RowObject>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.initTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows'] || changes['columns']) {
      this.initTable();
    }
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource<RowObject>(this.rows);
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.displayedColumns = this.columns.map((c) => c.key);
    if (this.actions) {
      this.displayedColumns.push('actions');
    }
    this.applyFilter();
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  isEmpty(): boolean {
    return this.dataSource.filteredData.length === 0;
  }
  onSortChange(sortState: Sort): void {
    if (!sortState.active || sortState.direction === '') {
      this.dataSource.data = this.rows.slice();
      return;
    }
    const col = this.columns.find((c) => c.key === sortState.active);
    if (col && col.sortable) {
      const data = this.rows.slice();
      data.sort((a, b) => {
        const valA = this.getCellValue(a, col);
        const valB = this.getCellValue(b, col);
        return (
          (valA < valB ? -1 : valA > valB ? 1 : 0) *
          (sortState.direction === 'asc' ? 1 : -1)
        );
      });
      this.dataSource.data = data;
    }
  }

  private getCellValue(row: RowObject, column: TableColumn<RowObject>): string {
    if (column.renderCell) {
      const val = column.renderCell(row);
      return typeof val === 'string' ? val : '';
    } else {
      const cellVal = (row as Record<string, unknown>)[column.key];
      return cellVal !== undefined && cellVal !== null ? String(cellVal) : '';
    }
  }
}
