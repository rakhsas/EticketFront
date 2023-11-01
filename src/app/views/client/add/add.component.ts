import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { client } from 'src/app/models/client';
import { clientService } from 'src/app/services/client.service';
import { categorieArticleService } from 'src/app/services/categorieArticle.service';
import { categorieArticle } from 'src/app/models/categorieArticle';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';

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
	data: any = [];

	constructor(
		private clientService: clientService,
		public dialog: MatDialog,
		private categorieArticleService: categorieArticleService,
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
		this.categorieArticleService.getData().subscribe(
			data => {
				this.data = [
					{
						options: this.mapCategorieArticlesToSelect2Options(data)
					}
				]
			}
		)
		if (this.clientData) {
			this.clientForm.patchValue({
				clientId: this.clientData.clientId,
				code: this.clientData.code,
				// categorieClient: this.clientData.categorieClient,
				categorieClient: null,
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
	private mapCategorieArticlesToSelect2Options(categorieArticles: categorieArticle[]): Select2Option[] {
		return categorieArticles.map(CategorieArticle => ({
			value: CategorieArticle.idCategorie.toString(), // Convert to string
			label: CategorieArticle.nomCategorie
		}));
	}
	change(key: string, event: Event) {
		console.log(key, event);
	}
	search(text: string) {
		this.data = text
			? (JSON.parse(JSON.stringify(this.data)) as Select2Option[]).filter(
				option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1,
			)
			: JSON.parse(JSON.stringify(this.data));
	}
	update(key: string, event: Select2UpdateEvent<any>) {
		console.log(event.value);
	}
}
