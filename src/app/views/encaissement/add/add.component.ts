import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { encaissement } from 'src/app/models/encaissement';
import { modePaiement } from 'src/app/models/modePaiement';
import { ventes } from 'src/app/models/ventes';
import { EncaissementService } from 'src/app/services/encaissement.service';
import { modePaiementService } from 'src/app/services/modePaiement.service';
import { ventesService } from 'src/app/services/ventes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Input() encaissementData!: encaissement;
	encaissements: encaissement[] = [];
	encaissement!: encaissement;
	ModesDePaiement: modePaiement[] = [];
	ventes: ventes[] = [];
	encaissementForm: FormGroup;
	action: String = "Ajouter";

  constructor(private encaissementService: EncaissementService,
		private modePaiementService: modePaiementService,
    private ventesService: ventesService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
		// private dialogRef: MatDialogRef<AddComponent>,
	) {
		this.encaissementForm = this.formBuilder.group({
			idEncaissement: null,
			montant: 0,
			avances: 0,
			modeDePaiement: null,
			imputations: null,
		  });
	}
  ngOnInit(){
		if (this.encaissementData)
		{
			console.log(this.encaissementData)
			this.encaissementForm.patchValue({
				idEncaissement: this.encaissementData.idEncaissement,
				montant: this.encaissementData.montant,
				avances: this.encaissementData.avances,
				imputations: this.encaissementData.imputations?.idVente,
				modeDePaiement: this.encaissementData.modeDePaiement?.idModePaiement
			})
			this.action = "Modifier"
		}
		this.modePaiementService.getData().subscribe(
			data => {
				this.ModesDePaiement = data;
			}
		)
    this.ventesService.getData().subscribe(
      data => {
        this.ventes = data;
      }
    )
	}
	onAdd(formValue: any) {
		if (!formValue.idEncaissement)
		{
			const transformedData = this.transformFormData(formValue);
			console.log(transformedData)
			this.encaissementService.addEncaissement(transformedData).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		}else{
			const transformedData = this.transformFormData(formValue);
			this.encaissementService.updateEncaissement(transformedData).subscribe(
				data => {
					this.openSnackBar("Updated Successfully", "cancel")
					// this.dialogRef.close();
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
			idEncaissement: formData.idEncaissement,
			montant: formData.montant,
			avances: formData.avances,
			modeDePaiement: { idModePaiement: formData.modeDePaiement },
		  imputations: { idVente: formData.imputations },
		};
	}
}

