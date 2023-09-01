import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Workflow } from 'src/app/models/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Input() workflowData!: Workflow;
	workflows: Workflow[] = [];
	workflow!: Workflow;
	workflowForm: FormGroup;
	action: String = "Ajouter";

	constructor(
		private workflowService: WorkflowService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.workflowForm = this.formBuilder.group({
			workFlowId: null,
			nom: '',
			parent: ''
		  });
	}
	ngOnInit(){
		if (this.workflowData)
		{
			console.log(this.workflowData)
			this.workflowForm.patchValue({
				workFlowId: this.workflowData.workFlowId,
				nom: this.workflowData.nom,
				parent: this.workflowData.parent,
			})
			this.action = "Modifier"
		}
		this.workflowService.getWorkflows().subscribe(
			data => {
				this.workflows = data;
			}
		)
	}
	onAdd(formValue: any) {
		console.log(formValue)
		if (!formValue.workFlowId)
		{
			const transformedData = this.transformFormData(formValue);
			this.workflowService.addWorkflow(transformedData).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		}
    // else{
		// 	const transformedData = this.transformFormData(formValue);
		// 	this.workflowService.up(transformedData).subscribe(
		// 		data => {
		// 			this.openSnackBar("Updated Successfully", "cancel")
		// 		}
		// 	)
		// }
	}
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action);
	  }
	transformFormData(formData: any): any {
		return {
			workFlowId: formData.workFlowId,
		  	nom: formData.nom,
		  	parent: formData.parent,
		};
	}
}
