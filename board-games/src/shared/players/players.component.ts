import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Player } from '../interface';

@Component({
  selector: 'bg-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit, OnChanges {
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

  /**
   * On Players Set
   */
  public onPlayersSet(players: Player[]) {
    this.namesEntered = true;
    this.players = players;
    this.toggleActivePlayer();
    this.startGame.emit();
  }

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
   * On Game Complete
   */
  private onGameComplete(value: boolean) {
      if (typeof this.currentPlayerIndex !== 'undefined' && value) {
        const player: Player = this.players[this.currentPlayerIndex];
        player.wins += 1;
        this.gameSetupDone = false;
      }
      const winnerPlayerOrder: Player[] = this.players.sort((player1, player2) => {
        const player1Wins = player1.wins;
        const player2Wins = player2.wins;
        return player2Wins - player1Wins;
      });
      this.winnerPlayer = winnerPlayerOrder[0];
  }

  /**
   * For Each Round
   */
  private onRoundDone(value: 'win' | 'noResult') {
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
