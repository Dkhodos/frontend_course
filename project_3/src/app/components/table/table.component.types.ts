import { SafeHtml } from '@angular/platform-browser';

export interface TableColumn<RowObject extends object> {
  key: string;
  header: string;
  renderCell?: (row: RowObject) => string | SafeHtml;
  sortable?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export type TableGetIdFn<RowObject extends object> = (
  row: RowObject
) => string | number;
