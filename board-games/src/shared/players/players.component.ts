import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Player } from '../interface';
import { GameResultComponent } from './game-result/game-result.component';

@Component({
  selector: 'bg-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit, OnChanges {
  isDraw = false;
  moveInProgress = false;
  currentPlayerIndex;
  winnerPlayer: Player;
  namesEntered = false;
  players: Player[] = [];
  form: FormGroup;

  @Input('roundDone') roundDone: 'win' | 'noResult';
  @Output('roundDoneChange') roundDoneChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('gameComplete') gameComplete = false;

  @Input('noOfPlayers') noOfPlayers = 2;

  @Input('gameSetupDone') gameSetupDone = false;

  @Output('startNextRound') startNextRound: EventEmitter<any> = new EventEmitter<any>();

  @Output('startGame') startGame: EventEmitter<Player[]> = new EventEmitter<Player[]>();

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // Declare Winner
    if (changes.gameComplete && typeof changes.gameComplete.currentValue !== 'undefined') {
      this.onGameComplete(changes.gameComplete.currentValue);
    }

    // Round Winner
    if (changes.roundDone && changes.roundDone.currentValue) {
      this.onRoundDone(changes.roundDone.currentValue);
    }
  }

  /**
   * Restart the game
   */
  public restart() {
    window.location.reload();
  }

  /**
   * On Players Set
   */
  public onPlayersSet(players: Player[]) {
    this.namesEntered = true;
    this.players = players;
    this.toggleActivePlayer();
    this.startGame.emit();
  }

  /**
   * Start Players Turn
   */
  public startPlayersTurn() {
    this.moveInProgress = true;
    this.startNextRound.emit();
  }

  /**
   * On Game Complete
   */
  private onGameComplete(value: boolean) {
    if (typeof this.currentPlayerIndex !== 'undefined' && value) {
      const player: Player = this.players[this.currentPlayerIndex];
      player.wins += 1;
      this.gameSetupDone = false;
      this.getResult();
    }
  }

  /**
   * Determine the result
   */
  private getResult() {
    const winnerPlayerOrder: Player[] = [...this.players];
    winnerPlayerOrder.sort((player1, player2) => {
      return player2.wins - player1.wins;
    });
    if (winnerPlayerOrder[0].wins === winnerPlayerOrder[1].wins) {
      this.isDraw = true;
    } else {
      winnerPlayerOrder[0].isWinner = true;
      this.winnerPlayer = winnerPlayerOrder[0];
    }
  }

  /**
   * For Each Round
   */
  private onRoundDone(value: 'win' | 'noResult') {
      this.moveInProgress = false;
      if (value === 'win') {
        const player: Player = this.players[this.currentPlayerIndex];
        player.wins += 1;
      }
      this.toggleActivePlayer();
      this.roundDoneChange.emit('');
  }

  /**
   * Toggle Active Player
   */
  private toggleActivePlayer() {
    if  (typeof this.currentPlayerIndex === 'undefined') {
      this.currentPlayerIndex = 0;
    } else {
      const nextUserIndex = this.currentPlayerIndex  + 1;
      if (nextUserIndex === this.players.length) {
        this.currentPlayerIndex = 0;
      } else {
        this.currentPlayerIndex = nextUserIndex;
      }
    }
  }
}
