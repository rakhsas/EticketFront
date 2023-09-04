import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Art } from 'src/app/models/art';
import { artService } from 'src/app/services/art.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent {
	@Input() artData!: Art;
	arts: Art[] = [];
	art!: Art;
	artForm: FormGroup;
	action: String = "Ajouter";

	constructor(
		private artService: artService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.artForm = this.formBuilder.group({
			idart: null,
			cpt: '',
			jtl: '',
			libel: ''
		});
	}
	ngOnInit() {
		if (this.artData) {
			// console.log(this.artData)
			this.artForm.patchValue({
				idart: this.artData.idart,
				cpt: this.artData.cpt,
				jtl: this.artData.jtl,
				libel: this.artData.libel,
			})
			this.action = "Modifier"
		}
		this.artService.getArts().subscribe(
			data => {
				this.arts = data;
			}
		)
	}
	onAdd(formValue: any) {
		if (!formValue.idart) {
			this.artService.addArt(formValue).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		} else {
			this.artService.updateArt(formValue).subscribe(
				data => {
					this.openSnackBar("Updated Successfully", "cancel")
				}
			)
		}
	}
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action);
	}
}
