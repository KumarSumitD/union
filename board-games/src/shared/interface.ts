export interface Player {
    control: string;
    name?: string;
    active?: boolean;
    wins?: number;
    isWinner?: boolean;
}

export interface CustomMap<T> {
    [key: string]: T;
}
