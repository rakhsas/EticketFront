import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { HistListComponent } from './hist-list/hist-list.component';
import { HistRoutingModule } from './hist.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { AddComponent } from './add/add.component';
import { DynamicSortableHeader } from '../DynamicSortable.directive';



@NgModule({
  declarations: [
    HistListComponent,
    ModalComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    HistRoutingModule,
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
  exports: [HistRoutingModule]
})
export class HistModule { }
