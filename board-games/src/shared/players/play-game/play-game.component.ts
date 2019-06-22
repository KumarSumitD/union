import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayGameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
