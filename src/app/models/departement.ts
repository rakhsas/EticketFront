import { TypeDepartement } from "./typeDepartement";
import { User } from "./user";

export interface Departement {
    departement_id: number;
    parent: "" | null;
    departementParent: Departement;
    flag_traitement: number;
    typeDepartement    : TypeDepartement;
    responsable: User;
    departement: string;
}