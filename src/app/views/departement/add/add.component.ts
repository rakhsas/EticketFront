import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departement } from 'src/app/models/departement';
import { TypeDepartement } from 'src/app/models/typeDepartement';
import { User } from 'src/app/models/user';
import { departementService } from 'src/app/services/departement.service';
import { typeDepartementService } from 'src/app/services/typeDepartement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Input() departementData!: Departement;
	departements: Departement[] = [];
	responsables: User[] = [];
  typeDepartements: TypeDepartement[] = []
	departementForm: FormGroup;
	action: String = "Ajouter";

	constructor(
    private departementService: departementService,
		private userService: UserService,
    private typeDepartement: typeDepartementService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.departementForm = this.formBuilder.group({
			departement_id: null,
			departement: '',
			flagTraitement: 0,
			departementParent: '',
			typeDepartement: '',
			responsable: '',
		  });
	}
	ngOnInit(){
		if (this.departementData)
		{
			console.log(this.departementData)
			this.departementForm.patchValue({
			  departement_id: this.departementData.departement_id,
			  departement: this.departementData.departement,
			  departementParent: this.departementData.departementParent,
			  flagTraitement: this.departementData.flag_traitement,
			  responsable: this.departementData.responsable,
			  typeDepartement: this.departementData.typeDepartement,
			})
			this.action = "Modifier"
		}
		this.userService.getData().subscribe(
			data => {
				console.log(data)
				this.responsables = data;
			}
			)
			this.departementService.getData().subscribe(
				data => {
		  console.log(data)
		  this.departements = data;
		}
		)
		this.typeDepartement.getData().subscribe(
			data => {
				console.log(data)
				this.typeDepartements = data;
      }
    )
	}
	onAdd(formValue: any) {
		console.log(formValue)
		if (!formValue.nligne)
		{
			// const transformedData = this.transformFormData(formValue);
			this.departementService.addDepartement(formValue).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		}else{
			// const transformedData = this.transformFormData(formValue);
			// this.departementService.updateHist(formValue).subscribe(
			// 	data => {
			// 		this.openSnackBar("Updated Successfully", "cancel")
			// 	}
			// )

		}
	}
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action);
	  }
	// transformFormData(formData: any): any {
	// 	return {
	// 		caisseId: formData.caisseId,
	// 	  	nomCaisse: formData.nomCaisse,
	// 	  	descriptionCaisse: formData.descriptionCaisse,
	// 	};
	// }
}
