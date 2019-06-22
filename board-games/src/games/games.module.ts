import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
// import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { routes } from './games.route';
import { GamesComponent } from './games.component';
import { MemoryComponent } from './memory/memory.component';
import { CardComponent } from './memory/card/card.component';

// TODO - Commented Routing Code as that is not working in standalone in html page.

const COMPONENTS = [
  GamesComponent,
  MemoryComponent,
  CardComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [GamesComponent]
})
export class GamesModule { }
