import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table'; // Import TableModule for grid
import { ButtonModule } from 'primeng/button'; // Import ButtonModule for grid actions
import { PageToolbarComponent } from '../page-toolbar/page-toolbar.component';
import { ItemDetailConfig, FormField } from './item-detail.types';
import { ToolbarAction } from '../page-toolbar/page-toolbar.types';
import { FluidModule } from 'primeng/fluid';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryOptions, QueryResult } from '../common-dto/query.dto';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { DatePickerModule } from 'primeng/datepicker';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'pb-item-detail', // Changed from pb-item-detail
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    TextareaModule,
    TableModule, // Add TableModule
    ButtonModule, // Add ButtonModule
    PageToolbarComponent,
    FluidModule,
    ToastModule,
    ConfirmDialogModule,
    DatePickerModule,
    ColorPickerModule,
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <pb-page-toolbar
      [header]="config.header"
      [supportsEdit]="config.isEditable"
      [supportsAdd]="config.supportsAdd"
      [supportsDelete]="config.supportsDelete"
      [isEditing]="isEditing"
      [actions]="config.customToolbarItems || []"
      [metrics]="config.metrics"
      (onEdit)="startEdit()"
      (onSave)="saveChanges()"
      (onCancel)="cancelEdit()"
      (onAdd)="createNew()"
      (onDelete)="confirmDelete()"
      (onMockData)="handleMockData()"
    ></pb-page-toolbar>

    <p-fluid>
      <div class="grid">
        <div
          *ngFor="let field of config.formLayout"
          class="col-12 md:col-6 field"
        >
          <label
            *ngIf="
              !field.newOnly || this.query.isNew || field.newOnly == undefined
            "
            [for]="field.key"
            >{{ field.label }}</label
          >

          <!-- Text Input -->
          <input
            *ngIf="
              field.type === 'text' &&
              (!field.newOnly || this.query.isNew || field.newOnly == undefined)
            "
            [id]="field.key"
            type="text"
            pInputText
            [(ngModel)]="editingItem[field.key]"
            [readonly]="!isEditing || field.disabled"
            [required]="field.required || false"
          />

          <!-- Textarea Input -->
          <textarea
            *ngIf="
              field.type === 'textarea' &&
              (!field.newOnly || this.query.isNew || field.newOnly == undefined)
            "
            [id]="field.key"
            pTextarea
            [(ngModel)]="editingItem[field.key]"
            [readonly]="!isEditing || field.disabled"
            [required]="field.required || false"
            [rows]="5"
            [autoResize]="true"
            style="width: 100%"
          ></textarea>

          <!-- Password Input -->
          <input
            *ngIf="
              field.type === 'password' &&
              (!field.newOnly || this.query.isNew || field.newOnly == undefined)
            "
            [id]="field.key"
            type="password"
            pInputText
            [(ngModel)]="editingItem[field.key]"
            [readonly]="!isEditing || field.disabled"
            [required]="field.required || false"
          />

          <!-- Number Input -->
          <p-inputNumber
            *ngIf="
              field.type === 'number' &&
              (!field.newOnly || this.query.isNew || field.newOnly == undefined)
            "
            [id]="field.key"
            [(ngModel)]="editingItem[field.key]"
            [readonly]="!isEditing || field.disabled"
            [required]="field.required || false"
          ></p-inputNumber>

          <!-- Date Input -->
          <p-datePicker
            *ngIf="
              field.type === 'date' &&
              !field.disabled &&
              (!field.newOnly || this.query.isNew || field.newOnly == undefined)
            "
            [id]="field.key"
            [(ngModel)]="editingItem[field.key]"
            [required]="field.required || false"
            dateFormat="mm.dd.yy"
          ></p-datePicker>

          <!-- Date Input (readonly) -->
          <input
            *ngIf="field.type === 'date' && field.disabled"
            [id]="field.key"
            type="text"
            pInputText
            [(ngModel)]="editingItem[field.key]"
            [readonly]="true"
            [required]="field.required || false"
            [disabled]="true"
          />

          <!-- Select Input -->
          <p-dropdown
            *ngIf="
              field.type === 'select' &&
              (!field.newOnly || this.query.isNew || field.newOnly == undefined)
            "
            [id]="field.key"
            [(ngModel)]="editingItem[field.key]"
            [options]="field.options"
            [disabled]="!isEditing"
            [required]="field.required || false"
            optionLabel="label"
            optionValue="value"
          ></p-dropdown>

          <!-- Checkbox Input -->
          <div
            *ngIf="
              field.type === 'checkbox' &&
              (!field.newOnly || this.query.isNew || field.newOnly == undefined)
            "
            class="field-checkbox"
          >
            <p-checkbox
              [id]="field.key"
              [(ngModel)]="editingItem[field.key]"
              [binary]="true"
              [disabled]="!isEditing"
            ></p-checkbox>
          </div>

          <!-- Color Picker Input -->
          <p-colorPicker
            *ngIf="
              field.type === 'color' &&
              (!field.newOnly ||
                this.query.isNew ||
                field.newOnly == undefined) &&
              !field.disabled &&
              isEditing
            "
            [id]="field.key"
            [(ngModel)]="editingItem[field.key]"
            [required]="field.required || false"
            [style]="{ width: '100%' }"
          ></p-colorPicker>

          <!-- Color Picker Input (readonly) -->
          <input
            *ngIf="
              field.type === 'color' &&
              (!field.newOnly ||
                this.query.isNew ||
                field.newOnly == undefined) &&
              (field.disabled || !isEditing)
            "
            [id]="field.key"
            type="text"
            pInputText
            [(ngModel)]="editingItem[field.key]"
            [readonly]="true"
            [required]="field.required || false"
            [disabled]="true"
            [style]="{ width: '100%' }"
          />
        </div>
      </div>
    </p-fluid>

    <!-- Grid/Table Section - Only show if gridColumns are defined -->
    <div
      *ngIf="config.gridColumns && config.gridColumns.length > 0"
      class="grid-section mt-4"
    >
      <h3 *ngIf="config.gridHeader">{{ config.gridHeader }}</h3>

      <p-table
        [value]="gridItems"
        [paginator]="false"
        [rows]="100"
        [rowsPerPageOptions]="[5, 10, 25, 50]"
        [loading]="gridLoading"
        styleClass="p-datatable-sm"
      >
        <ng-template pTemplate="header">
          <tr>
            <th *ngFor="let col of config.gridColumns">
              {{ col.header }}
            </th>
            <th *ngIf="config.gridRowSelect || config.gridRowDelete">
              Actions
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData>
          <tr>
            <td *ngFor="let col of config.gridColumns">
              <!-- Format cell based on column type -->
              <ng-container [ngSwitch]="col.type">
                <span *ngSwitchCase="'date'">{{
                  rowData[col.field] | date : col.format || 'short'
                }}</span>
                <span *ngSwitchCase="'boolean'">{{
                  rowData[col.field] ? 'Yes' : 'No'
                }}</span>
                <span *ngSwitchCase="'color'">
                  <div
                    class="color-preview"
                    [style.background-color]="rowData[col.field]"
                  ></div>
                  {{ rowData[col.field] }}
                </span>
                <span *ngSwitchDefault>{{ rowData[col.field] }}</span>
              </ng-container>
            </td>
            <td *ngIf="config.gridRowSelect || config.gridRowDelete">
              <div class="flex justify-content-end">
                <button
                  *ngIf="config.gridRowSelect"
                  pButton
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text"
                  (click)="onGridRowSelect(rowData)"
                ></button>
                <button
                  *ngIf="config.gridRowDelete"
                  pButton
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger"
                  (click)="onGridRowDelete(rowData)"
                ></button>
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td
              [attr.colspan]="
                config.gridColumns.length +
                (config.gridRowSelect || config.gridRowDelete ? 1 : 0)
              "
            >
              No records found
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <!-- Add the confirmation dialog -->
    <p-confirmDialog
      header="Confirmation"
      icon="pi pi-exclamation-triangle"
      message="Are you sure you want to delete this item? This action cannot be undone."
      [style]="{ width: '450px' }"
      acceptButtonStyleClass="p-button-danger"
      rejectButtonStyleClass="p-button-text"
    >
    </p-confirmDialog>

    <p-toast></p-toast>
  `,
  styles: [
    `
      .field {
        margin-bottom: 1.5rem;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
      }
      .field-checkbox {
        margin-top: 0.5rem;
      }
      .grid-section {
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      .mt-4 {
        margin-top: 1.5rem;
      }
      .color-preview {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        vertical-align: middle;
      }
    `,
  ],
})
export class ItemDetailComponent implements OnInit {
  @Input() config!: ItemDetailConfig;

  @Output() onCreate = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<void>();

  query: QueryOptions = {};
  item: any;
  isEditing: boolean = false;
  editingItem: any = {};

  // Grid related properties
  gridItems: any[] = [];
  gridLoading: boolean = false;
  gridTotalRecords: number = 0;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.query = this.config.dataService.parseParams(
        params,
        this.route.snapshot.queryParams
      );
      this.loadItem();
    });
  }

  startEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    if (this.query.id === 'new') {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.loadItem();
    }
  }

  loadItem() {
    this.config.dataService.loadItem(this.query).subscribe((item) => {
      this.item = item;

      // update all dates to date objects
      this.config.formLayout.forEach((field) => {
        if (field.type === 'date' && this.item[field.key]) {
          this.item[field.key] = new Date(this.item[field.key]);
        }
        if (this.item[field.key] === undefined) {
          this.item[field.key] = null;
        }
      });

      this.editingItem = { ...this.item };

      if (this.query.id === 'new') {
        this.isEditing = true;
      }

      if (this.config.breadcrumbField && this.query.id !== 'new') {
        this.breadcrumbService.updateLastBreadcrumbLabel(
          this.item[this.config.breadcrumbField]
        );
      }

      // Reload grid items whenever the main item changes (and it's not a new item)
      if (
        this.config.gridColumns &&
        this.config.gridColumns.length > 0 &&
        this.config.dataService.loadGridItems &&
        !this.query.isNew
      ) {
        this.loadGridItems();
      }

      if (this.config.dataService.updateMetrics) {
        this.config.metrics = this.config.dataService.updateMetrics(
          this.query,
          this.item
        );
      } else {
        if (this.item.metrics) {
          this.config.metrics = this.item.metrics;
        }
      }

      if (this.config.metrics) {
        for (var metric of this.config.metrics) {
          if (metric.field) {
            metric.value = this.item[metric.field];
          }
        }
      }

      // load all form field options
      this.config.formLayout.forEach((field) => {
        if (field.loadOptions) {
          field.loadOptions().subscribe((options) => {
            field.options = options;
          });
        }
      });
    });
  }

  loadGridItems() {
    if (!this.config.dataService.loadGridItems) return;

    this.gridLoading = true;
    this.config.dataService.loadGridItems(this.query).subscribe({
      next: (result: QueryResult<any>) => {
        this.gridItems = result.items.map((item) => ({
          ...item,
          ...item.item,
        }));
        this.gridTotalRecords = result.total;
        this.gridLoading = false;
      },
      error: (error) => {
        console.error('Error loading grid items:', error);
        this.gridLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load grid items',
        });
      },
    });
  }

  onGridRowSelect(rowData: any) {
    if (this.config.gridRowSelect) {
      this.config.gridRowSelect(rowData);
    }
  }

  onGridRowDelete(rowData: any) {
    if (this.config.gridRowDelete) {
      this.config.gridRowDelete(rowData);
      // Optionally reload grid items after delete
      this.loadGridItems();
    }
  }

  handleMockData() {
    console.log('Mock data');

    // walk through item and set reasonable values based on form field type and property name
    this.config.formLayout.forEach((field) => {
      this.editingItem[field.key] = this.getRandomValue(
        field.type,
        field.key,
        field.options
      );
    });
  }

  saveChanges() {
    if (this.query.id === 'new') {
      this.config.dataService
        .createItem(this.query, this.editingItem)
        .subscribe({
          next: (result) => {
            this.isEditing = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail:
                this.config.createSuccessMessage ??
                this.config.updateSuccessMessage,
            });
            this.onUpdate.emit(this.editingItem);

            this.editingItem.id = result.id;
            this.query.id = result.id;

            // change route to new id
            var currentRoute = this.router.routerState.snapshot.url;
            console.log('Current route:', currentRoute);
            // remove last id from route
            var newRoute = currentRoute.substring(
              0,
              currentRoute.lastIndexOf('/') + 1
            );
            console.log('New route:', newRoute);
            // navigate to new route
            this.router.navigate([newRoute, result.id]);
          },
          error: (error) => {
            console.error('Error saving changes:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to save changes',
            });
          },
        });
    } else {
      this.config.dataService
        .updateItem(this.query, this.editingItem)
        .subscribe({
          next: (result) => {
            this.isEditing = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: this.config.updateSuccessMessage,
            });
            this.onUpdate.emit(this.editingItem);
          },
          error: (error) => {
            console.error('Error saving changes:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to save changes',
            });
          },
        });
    }
  }

  createNew() {
    // remove last id and set new id
    this.query.id = 'new';
    this.editingItem = {};
    this.isEditing = true;
    var currentRoute = this.router.routerState.snapshot.url;
    console.log('Current route:', currentRoute);
    // remove last id from route
    var newRoute = currentRoute.substring(0, currentRoute.lastIndexOf('/') + 1);
    console.log('New route:', newRoute);
    // navigate to new route
    this.router.navigate([newRoute, 'new']);
  }

  getRandomValue(type: string, field: string, options?: any[]) {
    switch (type) {
      case 'text':
        if (field === 'username') {
          return this.getRandomUsername();
        }
        if (field === 'email') {
          return this.getRandomEmail();
        }
        if (field === 'password') {
          return this.getRandomPassword();
        }
        return 'Test ' + field + ' ' + Math.floor(Math.random() * 1000000);
      case 'number':
        return this.getRandomNumber();
      case 'date':
        return this.getRandomDate();
      case 'boolean':
        return this.getRandomBoolean();
      case 'select':
        return options?.[Math.floor(Math.random() * (options?.length || 1))]
          ?.value;
      case 'color':
        return this.getRandomColor();
      default:
        return null;
    }
  }

  getRandomEmail() {
    return 'testuser' + Math.floor(Math.random() * 1000000) + '@example.com';
  }

  getRandomUsername() {
    return 'testuser' + Math.floor(Math.random() * 1000000);
  }

  getRandomPassword() {
    return 'password' + Math.floor(Math.random() * 1000000);
  }

  getRandomDate() {
    return new Date();
  }

  getRandomBoolean() {
    return Math.random() < 0.5;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  getRandomColor() {
    // Generate a random hex color
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }

  // Confirmation before delete
  confirmDelete() {
    if (!this.config.supportsDelete) return;

    this.confirmationService.confirm({
      accept: () => {
        this.deleteItem();
      },
    });
  }

  private deleteItem() {
    this.config.dataService.deleteItem(this.query).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.config.deleteSuccessMessage,
        });
        this.onDelete.emit();

        // Navigate back to the list view
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error('Error deleting item:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete item',
        });
      },
    });
  }
}
