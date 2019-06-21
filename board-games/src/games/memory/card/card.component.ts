import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Card } from '../memory.interface';

@Component({
  selector: 'bg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('card') card: Card;
  constructor() { }

  ngOnInit() {
  }

}
