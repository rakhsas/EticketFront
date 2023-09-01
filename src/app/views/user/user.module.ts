import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { AddComponent } from './add/add.component';
import { UsersListComponent } from './UsersList/UsersList.component';
import { ModalComponent } from './modal/modal.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DynamicSortableHeader } from '../DynamicSortable.directive';


@NgModule({
  declarations: [
    AddComponent,
    UsersListComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
  exports: [UserRoutingModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
