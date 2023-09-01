import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { AddComponent } from './add/add.component';
import { DepartementList } from './DepartementList/Departement.component';
import { DepartementRoutingModule } from './departement-routing.module';
import { ModalComponent } from './modal/modal.component';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DynamicSortableHeader } from '../DynamicSortable.directive';



@NgModule({
  declarations: [
    AddComponent,
    DepartementList,
    ModalComponent
  ],
  imports: [
    CommonModule,
    DepartementRoutingModule,
    NgFor,
		DecimalPipe,
		AsyncPipe,
		NgbTypeaheadModule,
		DynamicSortableHeader,
		NgbPaginationModule,
		NgIf,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports: [DepartementRoutingModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DepartementModule { }