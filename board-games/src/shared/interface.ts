export interface Player {
    control: string;
    name?: string;
    active?: boolean;
    wins?: number;
}

export interface CustomMap<T> {
    [key: string]: T;
}
