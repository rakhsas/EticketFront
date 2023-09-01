import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { CaisseListComponent } from './caisse-list/caisse-list.component';
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
// import { CaissesNgbdSortableHeader } from './caisse-list/CaissesSortable.directive';
import { CaissesRoutingModule } from './caisses-routing.module';
import { DynamicSortableHeader } from '../DynamicSortable.directive';
import { AddComponent } from './add/add.component';
import { ModalComponent } from './modal/modal.component';




@NgModule({
  declarations: [
    CaisseListComponent,
    AddComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
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
  exports: [CaissesRoutingModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CaissesModule { }
