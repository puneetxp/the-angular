import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SkeletonComponent } from "./layout/skeleton/skeleton.component";
import { HeaderComponent } from "./page-components/header/header.component";
import { FooterComponent } from "./page-components/footer/footer.component";
import { SidenavComponent } from "./page-components/sidenav/sidenav.component";
import { MenuComponent } from "./page-components/sidenav/menu/menu.component";
import { PageTitleComponent } from "./page-components/page-title/page-title.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ArrayPipe, falsePipe } from "./pipe/array.pipe";
import { FileDragNDropDirective } from "./directive/file-drag-drop";
import { FormDynamicComponent } from "./Input/form-dynamic/form-dynamic.component";
import { InputDynamicComponent } from "./Input/form-dynamic/input-dynamic/input-dynamic.component";
import { MaterialModule } from "../module/material/material.module";
import { ConfirmComponent } from "./dialog/confirm/confirm.component";
import { SelectImagesComponent } from "./dialog/select-images/select-images.component";
import { SelectImageComponent } from "./dialog/select-image/select-image.component";
import { UploadImagesComponent } from "./upload/upload-images/upload-images.component";
import { UploadImageComponent } from "./upload/upload-image/upload-image.component";
import { UploadImageDialog } from "./upload/upload-images/upload-image-dialoge/upload-image-dialog.component";
import { SimpleSkeletonComponent } from "./layout/simple-skeleton/simple-skeleton.component";
import { NotAllowedComponent } from "./error/not-allowed/not-allowed.component";
import { NotFoundComponent } from "./error/not-found/not-found.component";
import { SortComponent } from "./sort/sort.component";
import { InputSelectComponent } from "./Input/form-dynamic/input-select/input-select.component";
import { TableMaterialComponent } from "./table/table-material/table-material.component";
import { PaginateComponent } from "./table/paginate/paginate.component";
import { DropdownAutocompleteComponent } from "./Input/form-dynamic/dropdown-autocomplete/dropdown-autocomplete.component";
import { FormDynamicDialogueComponent } from "./dialog/form-dynamic-dialogue/form-dynamic-dialogue.component";
import { StickyButtomFloatComponent } from "./layout/sticky-buttom-float/sticky-buttom-float.component";

@NgModule({
  declarations: [
    SkeletonComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    MenuComponent,
    PageTitleComponent,
    FormDynamicComponent,
    InputDynamicComponent,
    InputSelectComponent,
    FileDragNDropDirective,
    SelectImageComponent,
    SelectImagesComponent,
    ArrayPipe,
    falsePipe,
    ConfirmComponent,
    UploadImagesComponent,
    UploadImageDialog,
    UploadImageComponent,
    SimpleSkeletonComponent,
    NotAllowedComponent,
    NotFoundComponent,
    SortComponent,
    TableMaterialComponent,
    PaginateComponent,
    DropdownAutocompleteComponent,
    FormDynamicDialogueComponent,
    StickyButtomFloatComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    SkeletonComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    MenuComponent,
    PageTitleComponent,
    FormDynamicComponent,
    InputDynamicComponent,
    InputSelectComponent,
    SelectImageComponent,
    SelectImagesComponent,
    ArrayPipe,
    falsePipe,
    FileDragNDropDirective,
    ReactiveFormsModule,
    FormsModule,
    ConfirmComponent,
    UploadImagesComponent,
    UploadImageComponent,
    UploadImageDialog,
    SimpleSkeletonComponent,
    NotAllowedComponent,
    NotFoundComponent,
    SortComponent,
    TableMaterialComponent,
    PaginateComponent,
    DropdownAutocompleteComponent,
    FormDynamicDialogueComponent,
    StickyButtomFloatComponent,
  ],
})
export class ComponentsModule { }
