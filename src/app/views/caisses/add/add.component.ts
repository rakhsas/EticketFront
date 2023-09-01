import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Caisse } from 'src/app/models/caisse';
import { Departement } from 'src/app/models/departement';
import { Profil } from 'src/app/models/profil';
import { User } from 'src/app/models/user';
import { caisseService } from 'src/app/services/caisse.service';
import { departementService } from 'src/app/services/departement.service';
import { profileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';


@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent{
	@Input() caisseData!: Caisse;
	users: User[] = [];
	user!: User;
	profiles: Profil[] = [];
	departements: Departement[] = [];
	Caisses: Caisse[] = [];
	caisseForm: FormGroup;
	action: String = "Ajouter";

	constructor(private userService: UserService,
		private caisseService: caisseService,
		private profileService: profileService,
		private departementService: departementService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.caisseForm = this.formBuilder.group({
			caisseId: null,
			nomCaisse: '',
			descriptionCaisse: ''
		  });
	}
	ngOnInit(){
		if (this.caisseData)
		{
			console.log(this.caisseData)
			this.caisseForm.patchValue({
				caisseId: this.caisseData.caisseId,
				nomCaisse: this.caisseData.nomCaisse,
				descriptionCaisse: this.caisseData.descriptionCaisse,
			})
			this.action = "Modifier"
		}
		this.caisseService.getCaisses().subscribe(
			data => {
				this.Caisses = data;
			}
		)
	}
	onAdd(formValue: any) {
		console.log(formValue)
		if (!formValue.caisseId)
		{
			const transformedData = this.transformFormData(formValue);
			this.caisseService.addCaisse(transformedData).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		}else{
			const transformedData = this.transformFormData(formValue);
			this.caisseService.updateCaisse(transformedData).subscribe(
				data => {
					this.openSnackBar("Updated Successfully", "cancel")
				}
			)

		}
	}
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action);
	  }
	transformFormData(formData: any): any {
		return {
			caisseId: formData.caisseId,
		  	nomCaisse: formData.nomCaisse,
		  	descriptionCaisse: formData.descriptionCaisse,
		};
	}

}
