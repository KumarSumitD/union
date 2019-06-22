import {ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlayersComponent } from './players/players.component';
import { SetPlayersComponent } from './players/set-players/set-players.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  PlayersComponent,
  SetPlayersComponent
];

@NgModule({
  imports: [
  CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
