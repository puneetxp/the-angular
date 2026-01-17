import { animate, state, style, transition, trigger } from '@angular/animations';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { CommonModule, NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule, MatTable as MatTable_1, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { RouterModule, ɵEmptyOutletComponent } from '@angular/router';
import { Observable, window } from 'rxjs';
import { MatIconButton } from '@angular/material/button';
import { domain } from '../../../breakpoint';

@Component({
    selector: 'the-table-material',
    templateUrl: './table-material.component.html',
    styleUrls: ['./table-material.component.sass'],
    host: {
        class: "w-full",
    },
    animations: [
        trigger("detailExpand", [
            state("collapsed", style({ height: "0px", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
        ]),
    ],
    imports: [
        NgIf,
        MatFormField,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
        FormsModule,
        MatTable_1,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        NgFor,
        MatSortHeader,
        ɵEmptyOutletComponent,
        MatIconButton,
        MatIcon,
        NgClass,
        CdkPortalOutlet,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatNoDataRow,
        MatPaginator,
        AsyncPipe,
    ]
})
export class TableMaterialComponent implements OnInit {
  @Input() columnsToDisplay!: string[];
  @Input() columnsToDisplayfilter: string[] = [];
  @Input() table_mat$!: Observable<any>;
  @Input() isfilter!: boolean;
  @Input() isexpand = false;
  @Input() isexpandSwitch = true;
  @Input() isNodata = true;
  @Input() isDelete = false;
  public domain = domain;
  @Input() photoResolver?: (id: number | string) => Observable<{ public?: string | null } | null>;
  @Input() isEnable = false;
  @Input() isEdit = false;
  @Input() isexpandline = true;
  @Input() isPaginate = false;
  @Input() PageSize = 10;
  @Input() hightlight$ !:{key:string,value: Observable<any>};
  @Output() NodataOut = new EventEmitter();
  @Output() filters = new EventEmitter<Event>();
  @Output() selected = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() enable = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild("templatePortalContent") templatePortalContent!: TemplateRef<unknown>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  columnsToDisplayWithExpand!: string[];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  elementselected: any;
  templatePortal!: TemplatePortal<any>;
  MatTable() {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  select(element: any) {
    this.elementselected !== null && (this.elementselected = null);
    element !== null && setTimeout(() => { this.elementselected = element, this.selected.emit(element) }, 1);
  }
  constructor(
    private _viewContainerRef: ViewContainerRef,
  ) {

    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.templatePortal = new TemplatePortal(
      this.templatePortalContent,
      this._viewContainerRef,
    );
  }
  ngOnInit() {
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
    this.table_mat$.subscribe(i => { this.dataSource.data = i; });
    this.columnsToDisplayfilter = this.columnsToDisplay.filter(i => i !== 'photo_id')
  }
}
