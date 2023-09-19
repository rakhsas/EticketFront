import { categorieArticle } from "./categorieArticle";
import { encaissement } from "./encaissement";
import { article } from "./article";
import { client } from "./client";
import { User } from "./user";

export interface ventes {
	idVente: number;
	dateVente: Date;
	nature: string;
	categorie: categorieArticle;
	article: article;
	client: client;
	quantite: number;
	operateur: User;
	prixUnitaireHT: number;
	prixUnitaireTTC: number;
	montantTotalHT: number;
	montantTotalTTC: number;
	modeDePaiements: encaissement[];
	dateLimiteValidite: Date;
}