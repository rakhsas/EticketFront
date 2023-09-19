import { modePaiement } from "./modePaiement";
import { ventes } from "./ventes";

export interface encaissement {
	idEncaissement: number;
	modeDePaiement: modePaiement;
	montant: number;
	avances: number;
	imputations: ventes;
}
