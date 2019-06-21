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
  currentActivePlayer: string;
  winnerPlayer: Player;
  namesEntered = false;
  players: Player[] = [];
  form: FormGroup;

  @Input('roundWinner') roundWinner: boolean;

  @Input('declareWinner') declareWinner = false;

  @Input('activePlayer') activePlayer: string;

  @Input('noOfPlayers') noOfPlayers = 2;

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
  }

  ngOnChanges(changes: SimpleChanges) {
    // Make player active based on control name which is unique
    if (changes.activePlayer && changes.activePlayer.currentValue) {
      this.currentActivePlayer = changes.activePlayer.currentValue;
    }

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
    if (changes.roundWinner && typeof changes.roundWinner.currentValue !== 'undefined') {
      const player: Player = this.players.find((eachPlayer: Player) => {
        return eachPlayer.active;
      });
      player.wins += 1;
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
