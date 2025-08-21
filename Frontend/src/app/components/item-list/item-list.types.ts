import { Observable } from 'rxjs';
import { ToolbarAction, Metric } from '../page-toolbar/page-toolbar.types';
import { QueryOptions, QueryResult } from '../common-dto/query.dto';
import { Params } from '@angular/router';

export interface ColumnDefinition {
  field: string;
  header: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'select' | 'id';
  format?: string; // For dates or numbers
  options?: { label: string; value: any }[]; // For select fields
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  mobileHide?: boolean; // Add this property
}

export interface ItemListDataService<T> {
  parseParams: (params: Params, queryParams: Params) => QueryOptions;
  loadItems(params: QueryOptions): Observable<QueryResult<T>>;
  deleteItem?(params: QueryOptions, item: any): Observable<any>;
  updateHeader?(params: QueryOptions, items: any[], total: number): string;
}

/**
 * Defines the available view modes for the ItemList component
 */
export type ViewMode = 'table' | 'template';

export interface ItemListConfig {
  header: string;
  viewType?: 'table' | 'template';
  columns: ColumnDefinition[];
  dataService: ItemListDataService<any>;
  supportsAdd?: boolean;
  supportsEdit?: boolean;
  supportsDelete?: boolean;
  customToolbarItems?: ToolbarAction[];
  metrics?: Metric[];
  defaultSortField?: string;
  defaultSortOrder?: 1 | -1;
  rowsPerPageOptions?: number[];
  enableSearch?: boolean;
  editRouteAppend?: string;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  viewMode?: ViewMode; // New property to determine view mode

  // Template view specific properties
  templateConfig?: {
    layout?: 'grid' | 'list'; // Layout mode for data view
    rows?: number; // Number of rows per page
  };
}
