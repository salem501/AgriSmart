export interface Objectif {
    id?: number;
    titre: string;
    details: string;
    progression: number;
}

export interface KPI {
    id?: number;
    indicateur: string;
    objectifMensuel: string;
    realise: string;
    pourcentage: string;
}
