import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
	@Input() userData!: User;
	users: User[] = [];
	user!: User;
	profiles: Profil[] = [];
	departements: Departement[] = [];
	Caisses: Caisse[] = [];
	userForm: FormGroup;
	action: String = "Ajouter";

	constructor(private userService: UserService,
		private caisseService: caisseService,
		private profileService: profileService,
		private departementService: departementService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
		private dialogRef: MatDialogRef<AddComponent>,
	) {
		this.userForm = this.formBuilder.group({
			userId: null,
			prenomUser: '',
			actif: false,
			login: '',
			motPasse: '',
			co_NO: '',
			nomUser: '',
			toutDocument: false,
			updatePassword : false,
			assignedCaisses: [],
			profil: null,
			departement: null,
		  });
	}
	ngOnInit(){
		if (this.userData)
		{
			// console.log(this.userData)
			this.userForm.patchValue({
				userId: this.userData.userId,
				prenomUser: this.userData.prenomUser,
				nomUser: this.userData.nomUser,
				login: this.userData.login,
				motPasse: this.userData.motPasse,
				co_NO: this.userData.co_NO,
				toutDocument: this.userData.toutDocument,
				updatePassword: this.userData.updatePassword,
				assignedCaisses: this.userData.assignedCaisses.map((caisse: any) => caisse.caisseId),
				profil: this.userData.profil?.profilId, // Set the profilId value
				departement: this.userData.departement?.departement_id, // Set the departement_id value if it exists
				actif: this.userData.actif
			})
			this.action = "Modifier"
		}
		this.userService.getUsers().subscribe(
			data => {
				this.users = data;
			}
		);
		this.caisseService.getCaisses().subscribe(
			data => {
				this.Caisses = data;
			}
		)
		this.profileService.getProfiles().subscribe(
			data => {
				this.profiles = data;
			}
		)
		this.departementService.getDepartements().subscribe(
			data => {
				this.departements = data;
			}
		)

	}
	onAdd(formValue: any) {
		if (!formValue.userId)
		{
			const transformedData = this.transformFormData(formValue);
			this.userService.addUser(transformedData).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		}else{
			const transformedData = this.transformFormData(formValue);
			this.userService.updateUser(transformedData).subscribe(
				data => {
					this.openSnackBar("Updated Successfully", "cancel")
					this.dialogRef.close();
				}
			)
		}
	}
	openSnackBar(message: string, action: string) {
	this._snackBar.open(message, action, {
		duration: 3000, // Set the duration as needed
	});
}
	transformFormData(formData: any): any {
		return {
			userId: formData.userId,
		  prenomUser: formData.prenomUser,
		  nomUser: formData.nomUser,
		  login: formData.login,
		  motPasse: formData.motPasse,
		  co_NO: formData.co_NO,
		  toutDocument: formData.toutDocument,
		  updatePassword: formData.updatePassword,
		  profil: { profilId: formData.profil },
		  departement: { departement_id: formData.departement },
		  assignedCaisses: formData.assignedCaisses.map((caisseId: number) => ({ caisseId, isActive: true })),
		  actif: formData.actif
		};
	}

}
