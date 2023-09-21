import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { article } from 'src/app/models/article';
import { categorieArticle } from 'src/app/models/categorieArticle';
import { client } from 'src/app/models/client';
import { email } from 'src/app/models/email';
import { modePaiement } from 'src/app/models/modePaiement';
import { articleService } from 'src/app/services/article.service';
import { categorieArticleService } from 'src/app/services/categorieArticle.service';
import { clientService } from 'src/app/services/client.service';
import { emailService } from 'src/app/services/email.service';
import { modePaiementService } from 'src/app/services/modePaiement.service';
import { ventesService } from 'src/app/services/ventes.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent {
	clients: client[] = [];
	client: client = null;
	articles: article[] = [];
	categories: categorieArticle[] = [];
	modeDePaiements: modePaiement[] = [];
	venteForm: FormGroup;
	qrCodeImage: string;
	formData: any = null;
	dateVente: string = '';
	constructor(private clientService: clientService,
		private articleService: articleService,
		private categorieArticleService: categorieArticleService,
		private modeDePaiementService: modePaiementService,
		private venteService:ventesService,
		private emailService: emailService,
		public _snackBar: MatSnackBar,
		private formBuilder:  FormBuilder
	) {
		this.venteForm = this.formBuilder.group({
			idVente: null,
			dateVente: null,
			nature: '',
			categorie: null,
			article: null,
			client: null,
			quantite: 0,
			operateur: null,
			prixUnitaireHT: 0,
			prixUnitaireTTC: 0,
			montantTotalHT: 0,
			montantTotalTTC: 0,
			dateLimiteValidite: null,
			modeDePaiements: null,
			qrCodeImage: null
		})
	}
	ngOnInit() {
		this.articleService.getData().subscribe(
			data => {
				this.articles = data;
			}
		)
		this.clientService.getData().subscribe(
			data => {
				this.clients = data;
			}
		)
		this.categorieArticleService.getData().subscribe(
			data => {
				this.categories = data;
			}
		)
		this.modeDePaiementService.getData().subscribe(
			data => {
				this.modeDePaiements = data
			}
		)
	}
	onAdd(form: any) {
		if (!form.idVente)
		{
			this.formData = this.transformFormData(form);
			if (this.formData)
			{
				this.getInfos(this.formData);
			}
			this.venteService.addVente(this.formData).subscribe(
				data => {
			// 		console.log(data)
					this.qrCodeImage = 'data:image/png;base64,' + data.qrCodeImage
					console.log(this.qrCodeImage)
				}
			);
		}
	}

	public getInfos(formData: any) {
		console.log(this.formData)
		// console.log(this.articles)
		this.dateVente = this.formData.dateVente.getDate() + '/' + this.formData.dateVente.getMonth() + 1 + '/' + this.formData.dateVente.getFullYear();
		this.client = this.clients.find((field) => {
			return field.clientId == formData.client.clientId;
		});
		if (this.client)
			console.log(this.client.adresse);
		// console.log(formData.client.clientId)
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 200
		});
	}
	transformFormData(formData: any): any {
		return {
			idVente: formData.idVente,
			dateVente: new Date,
			nature: formData.nature,
			categorie: { idCategorie: formData.categorie },
			article: { idArticle :formData.article },
			client: { clientId: formData.client },
			quantite: formData.quantite,
			operateur: {userId: 4 },
			prixUnitaireHT: formData.prixUnitaireHT,
			prixUnitaireTTC: formData.prixUnitaireHT * 0.2 + formData.prixUnitaireHT,
			montantTotalHT: formData.prixUnitaireHT * formData.quantite,
			montantTotalTTC: (formData.prixUnitaireHT * formData.quantite) + (0.2 * formData.prixUnitaireHT * formData.quantite),
			dateLimiteValidite: new Date,
			modeDePaiements: null,
			qrCodeImage: null
		};
	}

	public downloadAsPdf(div) {
		let data = document.getElementById(div);
		html2canvas(data).then(canvas => {
			let filewidth = 208;
			let fileHeight = (canvas.height * filewidth) / canvas.width
			const content = canvas.toDataURL('image/png')
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(content, 'PNG', 0,0,filewidth,fileHeight);
			pdf.save('Facture.pdf');
			this.sendMail(pdf);
		})
	}
	public sendMail(pdf: jsPDF)
	{
		const pdfBlob = pdf.output('blob'); // Convert jsPDF to Blob

		const formData = new FormData();
		formData.append('to', this.client.email); // Convert email object to JSON string
		formData.append('file', pdfBlob, 'Facture.pdf');
		formData.append('body', "Invoice attached"); // Attach the PDF Blob as a file
		formData.append('subject', "Invoice"); // Attach the PDF Blob as a file

		this.emailService.sendMail(formData).subscribe(
			(data) => console.log(data),
			(error) => console.error(error)
		);
	}
}

