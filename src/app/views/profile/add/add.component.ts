import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profil } from 'src/app/models/profil';
import { Workflow } from 'src/app/models/workflow';
import { profileService } from 'src/app/services/profile.service';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Input() profilData!: Profil;
	profile!: Profil;
	profiles: Profil[] = [];
	workflows: Workflow[] = [];
	profileForm: FormGroup;
	action: String = "Ajouter";

	constructor(
		private profileService: profileService,
		private workflowService: WorkflowService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.profileForm = this.formBuilder.group({
			profilId: null,
			description: '',
			nomProfil: '',
			assignedWorkflows: []
		  });
	}
	ngOnInit(){
		if (this.profilData)
		{
			console.log(this.profilData)
			this.profileForm.patchValue({
				profilId: this.profilData.profilId,
				description: this.profilData.description,
				nomProfil: this.profilData.nomProfil,
				assignedWorkflows: this.profilData.assignedWorkflows.map((workFlowId: any) => workFlowId.workFlowId),

		})
			this.action = "Modifier"
		}
		this.profileService.getProfiles().subscribe(
			data => {
				this.profiles = data;
			}
		)
		this.workflowService.getData().subscribe(
			data => {
				this.workflows = data
			}
		)
	}
	onAdd(formValue: any) {
		if (!formValue.profilId)
		{
			const formData = this.transformFormData(formValue)
			this.profileService.addProfile(formData).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
				)
			}else{
				const transformedData = this.transformFormData(formValue);
				console.log(transformedData)
			this.profileService.updateProfile(transformedData).subscribe(
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
			profilId: formData.profilId,
			nomProfil: formData.nomProfil,
			description: formData.description,
			assignedWorkflows: formData.assignedWorkflows.map((workFlowId: number) => ({ workFlowId, isActive: true })),
		};
	}
}
