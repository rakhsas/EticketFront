import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Caisse } from 'src/app/models/caisse';
import { HistGesaur } from 'src/app/models/histgesaur';
import { caisseService } from 'src/app/services/caisse.service';
import { HistService } from 'src/app/services/hist.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent {
	@Input() histData!: HistGesaur;
	hists: HistGesaur[] = [];
	caisses: Caisse[] = [];
	histForm: FormGroup;
	action: String = "Ajouter";

	constructor(private histService: HistService,
		private caisseService: caisseService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.histForm = this.formBuilder.group({
			nligne: null,
			nomClient: '',
			caissier: '',
			datee: '',
			designation: '',
			montantHT: 0,
			montantTVA: 0,
			montantTTC: 0,
			modePaiement: '',
			quantite: 0,
			ncheque: '',
			nticket: '',
			nops: ''
		  });
	}
	ngOnInit(){
		if (this.histData)
		{
			console.log(this.histData)
			this.histForm.patchValue({
				nligne: this.histData.nligne,
				nomClient: this.histData.nomClient,
				caissier: this.histData.caissier,
				datee: this.histData.datee,
				designation: this.histData.designation,
				montantHT: this.histData.montantHT,
				montantTVA: this.histData.montantTVA,
				montantTTC: this.histData.montantTTC,
				modePaiement: this.histData.modePaiement,
				quantite: this.histData.quantite,
				ncheque: this.histData.ncheque,
				nticket: this.histData.nticket,
				nops: this.histData.nops,
			})
			this.action = "Modifier"
		}
		this.caisseService.getCaisses().subscribe(
			data => {
				this.caisses = data;
			}
		)
	}
	onAdd(formValue: any) {
		console.log(formValue)
		if (!formValue.nligne)
		{
			// const transformedData = this.transformFormData(formValue);
			this.histService.addHist(formValue).subscribe(
				data => {
					this.openSnackBar("Created Successfully", "cancel")
				}
			)
		}else{
			// const transformedData = this.transformFormData(formValue);
			this.histService.updateHist(formValue).subscribe(
				data => {
					this.openSnackBar("Updated Successfully", "cancel")
				}
			)

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
