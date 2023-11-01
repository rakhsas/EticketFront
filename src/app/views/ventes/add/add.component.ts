import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
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
// import * as $ from 'jquery';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';


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
	designationArticle: string;
	dateLimiteValidite: string = '';
	editableForm1: boolean = true;
	data1: any = [];
	data2: any = [];
	data3: any = [];
	constructor(
		private clientService: clientService,
		private articleService: articleService,
		private categorieArticleService: categorieArticleService,
		// public _snackBar: MatSnackBar,
		private modeDePaiementService: modePaiementService,
		private venteService: ventesService,
		private emailService: emailService,
		private formBuilder: FormBuilder,
		private datePipe: DatePipe,
	) {
		this.venteForm = this.formBuilder.group({
			idVente: null,
			dateVente: null,
			nature: '',
			categorie: [null, Validators.required],
			article: [null, Validators.required],
			client: [null, Validators.required],
			quantite: [0, Validators.required],
			operateur: null,
			prixUnitaireHT: [0, Validators.required],
			prixUnitaireTTC: [0, Validators.required],
			montantTotalHT: 0,
			montantTotalTTC: 0,
			dateLimiteValidite: [null, Validators.required],
			modeDePaiements: null,
			qrCodeImage: null
		})

	}

	change(key: string, event: Event) {
		console.log(key, event);
	}
	search1(text: string) {
		this.data1 = text
			? (JSON.parse(JSON.stringify(this.data1)) as Select2Option[]).filter(
				option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1,
			)
			: JSON.parse(JSON.stringify(this.data1));
	}
	search2(text: string) {
		this.data2 = text
			? (JSON.parse(JSON.stringify(this.data2)) as Select2Option[]).filter(
				option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1,
			)
			: JSON.parse(JSON.stringify(this.data2));
	}
	search3(text: string) {
		this.data3 = text
			? (JSON.parse(JSON.stringify(this.data3)) as Select2Option[]).filter(
				option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1,
			)
			: JSON.parse(JSON.stringify(this.data3));
	}
	update(key: string, event: Select2UpdateEvent<any>) {
		console.log(event.value);
	}
	ngOnInit() {
		this.articleService.getData().subscribe(
			data => {
				this.articles = data;
				this.data2 = [
					{
						options: this.mapArticlesToSelect2Options(this.articles)
					}
				]
			}
		)
		this.clientService.getData().subscribe(
			data => {
				this.clients = data;
				this.data1 = [
					{
						options: this.mapClientsToSelect2Options(this.clients)
					}
				];
			}
		)
		this.categorieArticleService.getData().subscribe(
			data => {
				this.categories = data;
				this.data3 = [
					{
						options: this.mapCategorieArticlesToSelect2Options(this.categories)
					}
				]
			}
		)
		this.modeDePaiementService.getData().subscribe(
			data => {
				this.modeDePaiements = data
			}
		)
		this.clients.forEach(f => {
			console.log(f)
		})
	}
	onAdd(form: any, stepper) {
		if (!form.idVente && this.venteForm.valid) {
			this.formData = this.transformFormData(form);
			if (this.formData) {
				this.getInfos(this.formData);
				const selectedArticle = this.articles.find(article => article.idArticle === form.article);
				if (selectedArticle) {
					this.designationArticle = selectedArticle.designation;
				}
			}
			this.venteService.addVente(this.formData).subscribe(
				data => {
					this.qrCodeImage = 'data:image/png;base64,' + data.qrCodeImage;
					stepper.next();
					this.editableForm1 = false;
				}
			);
		}
	}
	// openSnackBar(message: string, action: string) {
		// 	this._snackBar.open(message, action, {
			// 		duration: 200
	// 	});
	// }
	transformFormData(formData: any): any {
		// Obtenir l'objet d'article correspondant à partir de l'ID sélectionné
		const articleSelectionne = this.articles.find(article => article.idArticle === formData.article);
		// Récupérer la désignation de l'article, si l'article est sélectionné
		const designationArticle = articleSelectionne ? articleSelectionne.designation : '';
		return {
			idVente: formData.idVente,
			dateVente: new Date(),
			nature: formData.nature,
			categorie: { idCategorie: formData.categorie },
			article: { idArticle: formData.article },
			client: { clientId: formData.client },
			designationArticle: designationArticle, // Ajout de la désignation de l'article
			quantite: formData.quantite,
			operateur: { userId: 1 },
			prixUnitaireHT: formData.prixUnitaireHT,
			prixUnitaireTTC: formData.prixUnitaireHT * 0.2 + formData.prixUnitaireHT,
			montantTotalHT: formData.prixUnitaireHT * formData.quantite,
			montantTotalTTC: (formData.prixUnitaireHT * formData.quantite) + (0.2 * formData.prixUnitaireHT * formData.quantite),
			dateLimiteValidite: new Date(formData.dateLimiteValidite),
			modeDePaiements: null,
			qrCodeImage: null
		};
	}
	private formatDate(date: Date): string {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	public getInfos(formData: any) {
		this.dateVente = this.formatDate(this.formData.dateVente);
		this.dateLimiteValidite = this.formatDate(formData.dateLimiteValidite);
		this.client = this.clients.find((field) => {
			return field.clientId == formData.client.clientId;
		});
	}
	public downloadAsPdf(div) {
		const data = document.getElementById('pdf');
		html2canvas(data).then(canvas => {
			const fileWidth = 208;
			const fileHeight = (canvas.height * fileWidth) / canvas.width;
			const content = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'pt', 'a4', true);
			pdf.addImage(content, 'PNG', 0, 0, fileWidth, fileHeight);
			pdf.setFontSize(10);
			pdf.text('Nom de la société:', 10, pdf.internal.pageSize.height - 40);
			pdf.text('Adresse:', 10, pdf.internal.pageSize.height - 30);
			pdf.text('Email:', 10, pdf.internal.pageSize.height - 20);
			pdf.text('Téléphone:', 10, pdf.internal.pageSize.height - 10);
			console.log(pdf.output().length)
			// Convertir le document PDF en Blob
			const pdfBlob = pdf.output('blob');
			console.log(pdfBlob);
			// Envoi de l'e-mail avec la pièce jointe
			const formData = new FormData();
			formData.append('to', this.client.email);
			formData.append('subject', 'Invoice');
			formData.append('body', 'Invoice attached');
			formData.append('attachment', pdfBlob, 'facture.pdf');

			this.emailService.sendMail(formData).subscribe({
				next: (data) => {
					console.log('Email envoyé avec succès :', data);
					// Affichez un message de succès à l'utilisateur
					// this.openSnackBar('Email envoyé avec succès', 'Fermer');
				},
				error: (error) => {
					console.error('Erreur lors de l\'envoi de l\'email :', error);
					if (error instanceof HttpErrorResponse) {
						console.log('Statut de la réponse :', error.status);
						console.log('Réponse du serveur :', error.error); // C'est ici que vous pouvez trouver des informations détaillées sur l'erreur
						// this.openSnackBar('Error', 'Fermer');
					}
				}
			});
		});
	}
	private mapClientsToSelect2Options(clients: client[]): Select2Option[] {
		return clients.map(client => ({
			value: client.clientId.toString(), // Convert to string
			label: client.nomComplet
		}));
	}
	private mapArticlesToSelect2Options(articles: article[]): Select2Option[] {
		return articles.map(article => ({
			value: article.idArticle.toString(), // Convert to string
			label: article.designation
		}));
	}
	private mapCategorieArticlesToSelect2Options(categorieArticles: categorieArticle[]): Select2Option[] {
		return categorieArticles.map(CategorieArticle => ({
			value: CategorieArticle.idCategorie.toString(), // Convert to string
			label: CategorieArticle.nomCategorie
		}));
	}
}