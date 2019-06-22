import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Player } from '../../interface';

@Component({
  selector: 'bg-set-players',
  templateUrl: './set-players.component.html',
  styleUrls: ['./set-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetPlayersComponent implements OnInit {
  form: FormGroup;
  players: Player[];

  @Input('noOfPlayers') noOfPlayers = 2;

  @Output('playersSet') playersSet: EventEmitter<Player[]> = new EventEmitter<Player[]>();

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this._fb.group({});
    const tempPlayers: Player[] = [];

    for (let index = 0; index < this.noOfPlayers; index++) {
      const playerName = `player${index}`;
      tempPlayers.push({
        control: playerName
      });
      this.form.addControl(tempPlayers[index].control, new FormControl('', [Validators.required]));
    }
    this.players = tempPlayers;
  }

  /**
   * Set Players
   */
  public setPlayers() {
    const userName = Object.keys(this.form.value);
    Object.keys(this.form.value).forEach((name, index) => {
      this.players[index].name = this.form.value[name];
      this.players[index].wins = 0;
    });
    this.playersSet.emit(this.players);
  }

  /**
   * Reset the names
   */
  public resetNames() {
    this.form.reset();
  }

}
