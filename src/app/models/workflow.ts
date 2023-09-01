
export interface Workflow {
    workFlowId: number;
    nom: string;
    parent: Workflow | null;
}
