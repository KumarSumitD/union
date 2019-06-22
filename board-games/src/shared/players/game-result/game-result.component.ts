import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
