import {Injectable} from '@angular/core';
import { Player, CustomMap } from '../../shared/interface';
import { Card, Memory } from './memory.interface';

@Injectable()
export class MemoryService {
    /**
     * IMP !!!! NOt Needed , only needed when computer plays
     */
    public cardMemory: CustomMap<Memory> = {};
    public remainingUnOpenedCards: Card[];

    constructor() {
    }

    /**
     * Get Confirm Card Ids if available
     */
    public getConfirmCardIdPair(): number {
        if (!this.cardMemory) {
            return;
        }
        let desiredCardId: string;
        const currentCardIdArray = Object.keys(this.cardMemory);
        desiredCardId = currentCardIdArray.find((cardId: string) => {
            return !this.cardMemory[cardId].isMatched && this.cardMemory[cardId].positions.length === 2;
        });
        return desiredCardId ? parseInt(desiredCardId, 10) : null;
    }

    /**
     * Update memory when card is selected
     */
    private updateMemory(card: Card) {
        // Null Check
        if (!card) {
            return;
        }

        // Create memory object for new card id
        if (!this.cardMemory[card.cardId]) {
            this.cardMemory[card.cardId] = {
                positions: []
            };
        }

        // Update memory object for existing card ids
        const getExistingCardPosition = this.cardMemory[card.cardId].positions.indexOf(card.position);
        if (getExistingCardPosition < 0) {
            this.cardMemory[card.cardId].positions.push(card.position);
        }
    }

    /**
     * Update Remaining Un Opened Cards
     */
    public updateRemainingUnOpenedCards(card: Card) {
        const tempUnOpenedCards = [...this.remainingUnOpenedCards];
        for (let index = 0; index < tempUnOpenedCards.length; index++) {
            if (tempUnOpenedCards[index].position === card.position) {
                this.remainingUnOpenedCards.splice(index, 1);
                this.updateMemory(card);
                break;
            }
        }
    }

    /**
     * Check if first card exists in memory
     */
    public doesSecondCardExistInMemory(firstCard: Card): number {
        if (!(this.cardMemory[firstCard.cardId] && this.cardMemory[firstCard.cardId].positions.length === 2)) {
            return;
        }
        const positionsArray: number[] =  this.cardMemory[firstCard.cardId].positions;
        const cardPosition: number = positionsArray.indexOf(firstCard.position);
        return cardPosition === 0 ? positionsArray[1] : positionsArray[0];
    }

    /**
     * Mark matched in memory so that it can be use at later point of time
     */
    public updateMatchedInMemory(firstCard: Card, secondCard: Card) {
        this.cardMemory[firstCard.cardId].isMatched = true;
        this.cardMemory[firstCard.cardId].positions = [firstCard.position, secondCard.position];
    }

}
