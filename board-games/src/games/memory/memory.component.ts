import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MemoryService } from './memory.service';
import { Player } from '../../shared/interface';
import { Card } from './memory.interface';

@Component({
  selector: 'bg-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoryComponent implements OnInit {
  private activeUserIndex: number;
  private unMatchedCount: number;
  private roundInProgress = false;

  gameSetupDone = false;
  roundDone: 'win' | 'noResult';
  declareWinner = false;
  activePlayer: string;
  maxNoOfCards = new Array(10);
  playerSetDone = false;
  noOfCards = 0;
  cardsArray: Card[] = [];

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  /**
   * Users info is entered
   */
  public startGame() {
    this.playerSetDone = true;
  }

  /**
   * Numbers of cards selected, create random array
   */
  public numberOfCardsSelected() {
    const tempArray: Card[] = [];
    for (let index = 1; index <= this.noOfCards; index++) {
      tempArray.push({ cardId: index, isOpen: false, isMatched: false });
      tempArray.push({ cardId: index, isOpen: false, isMatched: false });
    }
    this.shuffleArray(tempArray);
    // this.memoryService.remainingUnOpenedCards = [...this.cardsArray];
    this.unMatchedCount = this.cardsArray.length / 2;
  }

  /**
   * Shuffle Array
   */
  private shuffleArray(tempArray: Card[]) {
    let currentIndex = tempArray.length;
    while (currentIndex !== 0 ) {
      let tempValue: Card;
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      tempValue = tempArray[randomIndex];
      tempArray[randomIndex] = tempArray[currentIndex];
      tempArray[currentIndex] = tempValue;
      tempArray[currentIndex].position = currentIndex;
    }
    this.cardsArray = tempArray;
    this.gameSetupDone = true;
  }

  /**
   * Card selection
   */
  public cardSelected(card: Card) {
    if (card.isOpen || card.isMatched || this.roundInProgress) {
      return;
    }
    card.isOpen = true;
    const openedCards: Card[] = this.cardsArray.filter((eachCard: Card) => {
      return eachCard.isOpen;
    });

    if (openedCards.length === 2) {
      this.roundInProgress = true;
      setTimeout(() => {
        this.isCardMatched(openedCards[0], openedCards[1]);
        this.roundInProgress = false;
        this.cdr.markForCheck();
      }, 2000);
    }
  }

  /**
   * Check If Card is matched
   */
  private isCardMatched(firstCard: Card, secondCard: Card) {
    let roundResult: 'win' | 'noResult' = 'noResult';
    if (firstCard.cardId === secondCard.cardId) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      roundResult = 'win';
    }
    const matchedCards: Card[] = this.cardsArray.filter((eachCard: Card) => {
      return eachCard.isMatched;
    });
    this.declareWinner = matchedCards.length === this.cardsArray.length;
    if (!this.declareWinner) {
      this.roundDone = roundResult;
    }
    firstCard.isOpen = false;
    secondCard.isOpen = false;
  }

  /**
   * IMP!!!! - Below Code is commented as this is when computer plays
   */

  /**
   * Choose Cards
   */
  // private chooseCards() {
  //   // Check if any confirmed combination is available
  //   const anyConfirmCardIdPair = this.memoryService.getConfirmCardIdPair();
  //   if (anyConfirmCardIdPair) {
  //     this.checkForConfirmedPairsInMemories(anyConfirmCardIdPair);
  //   } else {
  //     this.unknownMemories();
  //   }
  // }

  /**
   * See If any card both positions are known
   */
  // private checkForConfirmedPairsInMemories(confirmedCardIdPair: number) {
  //   // Get Card for confirmed cards
  //   const cardsByRandomCardId: Card[] = this.cardsArray.filter((eachCard: Card) => {
  //     return eachCard.cardId === confirmedCardIdPair;
  //   });
  //   cardsByRandomCardId[0].isOpen = true;
  //   cardsByRandomCardId[1].isOpen = true;
  //   this.markCardAsMatched(cardsByRandomCardId[0], cardsByRandomCardId[1]);
  // }

  /**
   * When Either one or more positions are unavailable in memory
   */
  // private unknownMemories() {
  //   let firstOpenedCard: Card;
  //   let secondOpenedCard: Card;
  //   firstOpenedCard = this.openRandomUnOpenedCards();
  //   const secondCardPosition: number = this.memoryService.doesSecondCardExistInMemory(firstOpenedCard);
  //   if (secondCardPosition) {
  //     secondOpenedCard = this.cardsArray.find((eachCard: Card) => {
  //       return eachCard.position === secondCardPosition;
  //     });
  //     secondOpenedCard.isOpen = true;
  //     this.markCardAsMatched(firstOpenedCard, secondOpenedCard);
  //   } else {
  //     // Go for 2nd card also to be picked randomly
  //     secondOpenedCard = this.openRandomUnOpenedCards(firstOpenedCard);
  //     this.matchCards(firstOpenedCard, secondOpenedCard);
  //   }
  // }

  /**
   * Open First Random Card and update memory
   */
  // private openRandomUnOpenedCards(firstRandomCard?: Card): Card {
  //   let card: Card;
  //   const randomCardIndex: number = (Math.ceil(Math.random() * this.memoryService.remainingUnOpenedCards.length)) - 1;
  //   const randomPosition: number = this.memoryService.remainingUnOpenedCards[randomCardIndex].position;

  //   // Get Random Cards based on random card ids
  //   card = this.cardsArray.find((eachCard: Card) => {
  //     return eachCard.position === randomPosition;
  //   });

  //   // Check for logic error and print in console
  //   if (!card) {
  //     console.error('Something wrong with logic');
  //     return;
  //   }

  //   this.memoryService.updateRemainingUnOpenedCards(card);
  //   card.isOpen = true;
  //   return card;
  // }

  /**
   *  Check if card matches
   */
  // private matchCards(firstCard: Card, secondCard: Card) {
  //   if (firstCard.cardId === secondCard.cardId) {
  //     this.markCardAsMatched(firstCard, secondCard);
  //   } else {
  //     setTimeout(() => {
  //       firstCard.isOpen = false;
  //       secondCard.isOpen = false;
  //       this.roundDone = 'noResult';
  //       this.cdr.markForCheck();
  //     }, 1000);
  //   }
  // }

  /**
   * Mark cards as matched and also update wins
   */
  // private markCardAsMatched(firstCard: Card, secondCard: Card) {
  //   setTimeout(() => {
  //     firstCard.isMatched = true;
  //     secondCard.isMatched = true;
  //     this.memoryService.updateMatchedInMemory(firstCard, secondCard);
  //     this.unMatchedCount--;
  //     if (this.unMatchedCount === 0) {
  //       this.declareWinner = true;
  //     } else {
  //       this.roundDone = 'win';
  //     }
  //     this.cdr.markForCheck();
  //   }, 2000);
  // }

  /**
   * Check if next round is needed
   */
  // public startNextRound() {
  //   if (this.unMatchedCount !== 0) {
  //     this.chooseCards();
  //   } else {
  //     this.declareWinner = true;
  //   }
  // }
}
