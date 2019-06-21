
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bg-app',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GamesComponent {
  title = 'app';

}
