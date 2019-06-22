import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Player } from '../../interface';

@Component({
  selector: 'bg-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameResultComponent implements OnInit {

  @Input('winnerPlayer') winnerPlayer: Player;
  @Input('isDraw') isDraw = false;
  constructor() { }

  ngOnInit() {
  }
}
