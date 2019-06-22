import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Player } from '../../interface';

@Component({
  selector: 'bg-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {

  @Input('moveInProgress') moveInProgress = false;
  @Input('currentPlayerIndex') currentPlayerIndex;
  @Input('players') players: Player[];
  @Input('gameSetupDone') gameSetupDone = false;

  @Output('startPlayersTurn') startPlayersTurn: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

}
