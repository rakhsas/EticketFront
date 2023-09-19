import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { client } from 'src/app/models/client';
import { clientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Input() clientData!: client;
	departements: client[] = [];
	clientForm: FormGroup;
	action: String = "Ajouter";

  constructor(
		private clientService: clientService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.clientForm = this.formBuilder.group({
			clientId: null,
			code: '',
			categorieClient: '',
			intitule: '',
			adresse: '',
			telephone: '',
			fax: '',
			email: '',
			contactClient: '',
		});
	}
  ngOnInit() {
		if (this.clientData) {
			this.clientForm.patchValue({
				clientId: this.clientData.clientId,
				code: this.clientData.code,
				categorieClient: this.clientData.categorieClient,
				intitule: this.clientData.intitule,
				adresse: this.clientData.adresse,
				telephone: this.clientData.telephone,
				fax: this.clientData.fax,
				email: this.clientData.email,
				contactClient: this.clientData.contactClient,
			})
			this.action = "Modifier"
		}
	}
  onAdd(formValue: any) {
		if (!formValue.clientId) {
			// const transformedData = this.transformFormData(formValue);
			this.clientService.addClient(formValue).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		} else {
			// const transformedData = this.transformFormData(formValue);
			this.clientService.updateClient(formValue).subscribe(
				data => {
					this.openSnackBar("Updated Successfully", "cancel")
				}
			)
		}
	}
  openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
      duration: 3000, // Set the duration as needed
    });
	}
}
