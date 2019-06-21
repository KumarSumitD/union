import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MemoryService } from './memory.service';
import { Player } from '../../shared/interface';
import { Card } from './memory.interface';

@Component({
  selector: 'bg-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MemoryService]
})
export class MemoryComponent implements OnInit {
  private allPlayers: Player[];
  private activeUserIndex: number;
  private unMatchedCount: number;

  declareWinner = false;
  activePlayer: string;
  maxNoOfCards = new Array(10);
  userSetDone = false;
  noOfCardsSelected = false;
  noOfCards = 0;
  cardsArray: Card[];

  constructor(
    private memoryService: MemoryService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  /**
   * Users info is entered
   */
  public playersSet(playeres: Player[]) {
    this.allPlayers = playeres;
    this.userSetDone = true;
  }

  /**
   * Numbers of cards selected, create random array
   */
  public numberOfCardsSelected() {
    this.noOfCardsSelected = true;
    const tempArray: Card[] = [];
    for (let index = 1; index <= this.noOfCards; index++) {
      tempArray.push({ cardId: index, isOpen: false, isMatched: false });
      tempArray.push({ cardId: index, isOpen: false, isMatched: false });
    }
    this.shuffleArray(tempArray);
    this.memoryService.remainingUnOpenedCards = [...this.cardsArray];
    this.unMatchedCount = this.cardsArray.length / 2;
    setTimeout(() => {
      console.log('Game Starting');
      this.chooseCards();
      this.cdr.markForCheck();
    }, 3000);
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
  }

  /**
   * Toggle Active Player
   */
  private toggleActivePlayer() {
    if  (typeof this.activeUserIndex === 'undefined') {
      this.activeUserIndex = 0;
    } else {
      const nextUserIndex = this.activeUserIndex  + 1;
      if (nextUserIndex === this.allPlayers.length) {
        this.activeUserIndex = 0;
      } else {
        this.activeUserIndex = nextUserIndex;
      }
    }
    this.activePlayer = this.allPlayers[this.activeUserIndex].control;
  }

  /**
   * Choose Cards
   */
  private chooseCards() {
    console.log('Choose Cards');
    this.toggleActivePlayer();

    // Check if any confirmed combination is available
    const anyConfirmCardIdPair = this.memoryService.getConfirmCardIdPair();
    if (anyConfirmCardIdPair) {
      this.checkForConfirmedPairsInMemories(anyConfirmCardIdPair);
    } else {
      this.unknownMemories();
    }
    this.checkForNextRound();
  }

  /**
   * See If any card both positions are known
   */
  private checkForConfirmedPairsInMemories(confirmedCardIdPair: number) {
    // Get Card for confirmed cards
    const cardsByRandomCardId: Card[] = this.cardsArray.filter((eachCard: Card) => {
      return eachCard.cardId === confirmedCardIdPair;
    });
    cardsByRandomCardId[0].isOpen = true;
    cardsByRandomCardId[1].isOpen = true;
    this.markCardAsMatched(cardsByRandomCardId[0], cardsByRandomCardId[1]);
    this.checkForNextRound();
  }

  /**
   * When Either one or more positions are unavailable in memory
   */
  private unknownMemories() {
    let firstOpenedCard: Card;
    let secondOpenedCard: Card;
    firstOpenedCard = this.openRandomUnOpenedCards();
    const secondCardPosition: number = this.memoryService.doesSecondCardExistInMemory(firstOpenedCard);
    if (secondCardPosition) {
      secondOpenedCard = this.cardsArray.find((eachCard: Card) => {
        return eachCard.position === secondCardPosition;
      });
      secondOpenedCard.isOpen = true;
      this.markCardAsMatched(firstOpenedCard, secondOpenedCard);
    } else {
      // Go for 2nd card also to be picked randomly
      secondOpenedCard = this.openRandomUnOpenedCards(firstOpenedCard);
      this.matchCards(firstOpenedCard, secondOpenedCard);
    }
  }

  /**
   * Open First Random Card and update memory
   */
  private openRandomUnOpenedCards(firstRandomCard?: Card): Card {
    let card: Card;
    const randomCardIndex: number = (Math.ceil(Math.random() * this.memoryService.remainingUnOpenedCards.length)) - 1;
    const randomPosition: number = this.memoryService.remainingUnOpenedCards[randomCardIndex].position;

    // Get Random Cards based on random card ids
    card = this.cardsArray.find((eachCard: Card) => {
      return eachCard.position === randomPosition;
    });

    // Check for logic error and print in console
    if (!card) {
      console.error('Something wrong with logic');
      return;
    }

    this.memoryService.updateRemainingUnOpenedCards(card);
    card.isOpen = true;
    return card;
  }

  /**
   *  Check if card matches
   */
  private matchCards(firstCard: Card, secondCard: Card) {
    if (firstCard.cardId === secondCard.cardId) {
      this.markCardAsMatched(firstCard, secondCard);
    } else {
      setTimeout(() => {
        firstCard.isOpen = false;
        secondCard.isOpen = false;
        this.cdr.markForCheck();
      }, 1000);
    }
  }

  /**
   * Mark cards as matched and also update wins
   */
  private markCardAsMatched(firstCard: Card, secondCard: Card) {
    firstCard.isMatched = true;
    secondCard.isMatched = true;
    this.memoryService.updateMatchedInMemory(firstCard, secondCard);
    this.unMatchedCount--;
  }

  /**
   * Check if next round is needed
   */
  private checkForNextRound() {
    setTimeout(() => {
      if (this.unMatchedCount !== 0) {
        this.chooseCards();
      } else {
        this.declareWinner = true;
      }
      this.cdr.markForCheck();
    }, 5000);
  }
}
