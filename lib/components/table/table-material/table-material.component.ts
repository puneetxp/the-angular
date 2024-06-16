import { animate, state, style, transition, trigger } from '@angular/animations';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable as MatTable_1, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PhotoService } from 'src/app/shared/Service/Model/Photo.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ɵEmptyOutletComponent } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';

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
    standalone: true,
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
    ],
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
  @Input() isEnable = false;
  @Input() isEdit = false;
  @Input() isexpandline = true;
  @Input() isPaginate = false;
  @Input() PageSize = 10;
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
    public photos: PhotoService,
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
