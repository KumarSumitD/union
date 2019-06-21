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

  @Input('declareWinner') declareWinner = false;

  @Input('noOfPlayers') noOfPlayers = 2;

  @Input('gameSetupDone') gameSetupDone = false;

  @Output('startNextRound') startNextRound: EventEmitter<any> = new EventEmitter<any>();

  @Output('playersSet') playersSet: EventEmitter<Player[]> = new EventEmitter<Player[]>();

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({});
    const tempPlayers: {'control': string}[] = [];

    for (let index = 0; index < this.noOfPlayers; index++) {
      const playerName = `player${index}`;
      tempPlayers.push({
        control: playerName
      });
      this.form.addControl(tempPlayers[index].control, new FormControl('', [Validators.required]));
    }
    this.players = tempPlayers;
    this.toggleActivePlayer();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Declare Winner
    if (changes.declareWinner && typeof changes.declareWinner.currentValue !== 'undefined') {
      const winnerPlayerOrder: Player[] = this.players.sort((player1, player2) => {
        const player1Wins = player1.wins;
        const player2Wins = player2.wins;
        return player2Wins - player1Wins;
      });
      this.winnerPlayer = winnerPlayerOrder[0];
    }

    // Round Winner
    if (changes.roundDone) {
      if (!changes.roundDone.currentValue) {
        return;
      }

      if (changes.roundDone.currentValue === 'win') {
        const player: Player = this.players[this.currentPlayerIndex];
        player.wins += 1;
        // this.roundWinnerChange.emit(false);
      }
      this.toggleActivePlayer();
      this.roundDoneChange.emit('');
    }
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


  /**
   * Start the game and pass user info to consuming component
   */
  public setName() {
    const userName = Object.keys(this.form.value);
    Object.keys(this.form.value).forEach((name, index) => {
      this.players[index].name = this.form.value[name];
      this.players[index].wins = 0;
    });
    this.namesEntered = true;
    this.playersSet.emit(this.players);
  }

  /**
   * Reset the names
   */
  public resetNames() {
    this.form.reset();
  }

}
