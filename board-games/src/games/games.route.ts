import {Routes} from '@angular/router';
import { MemoryComponent } from '../games/memory/memory.component';

export const routes: Routes = [
    {
        path: 'games',
        children: [
            {
                path: 'memory-game',
                component: MemoryComponent
            },
            { path: '**', redirectTo: 'memory-game', pathMatch: 'full'}
        ]
    },
    { path: '**', redirectTo: 'games/memory-game', pathMatch: 'full'}
];
