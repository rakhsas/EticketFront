import { User } from "./user";
import { Workflow } from "./workflow";

export interface Profil {
    profilId: number;
    description: string;
    nomProfil: string;
    assignedWorkflows: Workflow[];

}
