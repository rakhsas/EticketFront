import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clavier } from 'src/app/models/p_clavier';
import { ClavierService } from 'src/app/services/p_clavier.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Input() clavierData!: Clavier;
	clavier!: Clavier;
	clavierForm: FormGroup;
	action: String = "Ajouter";

	constructor(
		private clavierService: ClavierService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.clavierForm = this.formBuilder.group({
			idNum: null,
			libelle: '',
		});
	}
	ngOnInit() {
		if (this.clavierData) {
			// console.log(this.clavierData)
			this.clavierForm.patchValue({
				idNum: this.clavierData.idNum,
				libelle: this.clavierData.libelle,
			})
			this.action = "Modifier"
		}
	}
	onAdd(formValue: any) {
		if (!formValue.idNum) {
      // console.log(formValue)
			this.clavierService.addClavier(formValue).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		}
    // else {
		// 	this.clavierService.updateArt(formValue).subscribe(
		// 		data => {
		// 			this.openSnackBar("Updated Successfully", "cancel")
		// 		}
		// 	)
		// }
	}
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action);
	}
}
