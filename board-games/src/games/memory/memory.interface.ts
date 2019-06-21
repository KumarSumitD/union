export interface Card {
    cardId: number;
    position?: number;
    isOpen?: boolean;
    isMatched?: boolean;

}

export interface Memory {
    isMatched?: boolean;
    positions: number[];
}
