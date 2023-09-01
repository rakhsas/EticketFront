import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ArtListComponent } from './art-list/art-list.component';
import { ArtRoutingModule } from './art.routing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicSortableHeader } from '../DynamicSortable.directive';
import { ModalComponent } from './modal/modal.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    ArtListComponent,
    ModalComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    ArtRoutingModule,
    FormsModule,
    NgFor,
    DecimalPipe,
    AsyncPipe,
    NgbTypeaheadModule,
    DynamicSortableHeader,
    NgbPaginationModule,
    NgIf,
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
    exports: [ArtRoutingModule]
})
export class ArtModule { }
