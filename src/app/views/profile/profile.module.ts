import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ProfileListeComponent } from './profile-liste/profile-liste.component';
import { ProfileRoutingModule } from './profile-routing.module';
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
import { DynamicSortableHeader } from '../DynamicSortable.directive';
import { AddComponent } from './add/add.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    ProfileListeComponent,
    AddComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
  exports: [ProfileRoutingModule],
})
export class ProfileModule { }
