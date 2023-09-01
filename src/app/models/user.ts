import { Caisse } from "./caisse";
import { Departement } from "./departement";
import { Profil } from "./profil";

export interface User {
    userId: number;
    prenomUser: string;
    actif: boolean;
    login: string;
    motPasse: string;
    co_NO: string;
    nomUser: string;
    toutDocument: boolean;
    updatePassword: boolean;
    assignedCaisses: Caisse[];
    profil: Profil;
    departement: Departement;
}
