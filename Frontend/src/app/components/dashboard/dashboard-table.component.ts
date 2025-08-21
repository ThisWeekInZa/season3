import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DashboardItem, DashboardTableData } from './dashboard.types';
import { catchError } from 'rxjs';

@Component({
  selector: 'pb-dashboard-table',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ProgressSpinnerModule],
  template: `
    <p-card [title]="tableData.title" styleClass="h-full">
      <h2>{{ tableData.title }}</h2>
      <p-table
        [paginator]="tableData.showPaginator !== false"
        [rows]="data.length"
        [rowsPerPageOptions]="tableData.pageSizeOptions"
        styleClass="p-datatable-sm"
        [selectionMode]="tableData.onRowSelect ? 'single' : undefined"
        (onRowSelect)="onRowSelect($event)"
        [loading]="loading"
        [value]="data"
      >
        <ng-template pTemplate="header">
          <tr>
            <th *ngFor="let col of tableData.columns">
              {{ col.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData>
          <tr [pSelectableRow]="rowData">
            <td *ngFor="let col of tableData.columns">
              <ng-container [ngSwitch]="col.type">
                <span *ngSwitchCase="'date'">{{
                  rowData[col.field] | date : col.format || 'short'
                }}</span>
                <span *ngSwitchCase="'boolean'">{{
                  rowData[col.field] ? 'Yes' : 'No'
                }}</span>
                <span *ngSwitchDefault>{{ rowData[col.field] }}</span>
              </ng-container>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td [attr.colspan]="tableData.columns.length" class="text-center">
              No records found
            </td>
          </tr>
        </ng-template>
      </p-table>
    </p-card>
  `,
  styles: [
    `
      .h-full {
        height: 100%;
      }
    `,
  ],
})
export class DashboardTableComponent {
  @Input() tableData!: DashboardTableData;
  @Input() itemConfig!: DashboardItem;
  @Input() loading: boolean = false;

  data: any[] = [];

  onRowSelect(event: any): void {
    if (this.tableData.onRowSelect) {
      this.tableData.onRowSelect(event.data);
    }
  }

  loadData(): void {
    if (this.itemConfig.loadItems) {
      this.loading = true;
      this.itemConfig
        .loadItems()
        .pipe(
          catchError((error) => {
            console.error('Error loading items:', error);
            this.loading = false;
            return [];
          })
        )
        .subscribe((data) => {
          if (this.tableData.flattenedData === false) {
            this.tableData.data = data;
            this.data = data;
          } else {
            const flattendItems = data.items.map((item: any) => ({
              ...item,
              ...item.item,
            }));
            this.tableData.data = flattendItems;
            this.data = flattendItems;
          }
          this.loading = false;
        });
    }
  }
  ngOnInit(): void {
    if (this.itemConfig.loadItems) {
      this.loadData();
    }
  }
}
