import './style.css'

import { Kornel } from 'kornel';

import { helloWorld } from './modules/hello-world';
import { titleModule } from './modules/title';
import { dashboardModule } from './modules/dashboard';
import { LogTileWidget } from './modules/dashboard-log';
import { TodoModule } from './modules/todo';
import { countModule } from './modules/counter';
import { eventButtonModule } from './modules/event-button';

const kornel = new Kornel().create();

kornel.register('hello-world', helloWorld);

kornel.register('grid', dashboardModule(), {id:'grid'});

kornel.register('grid-log-tile', LogTileWidget());
kornel.register('count-event-tile', countModule());
kornel.register('event=button-tile', eventButtonModule());
kornel.register('grid-todo', TodoModule());

kornel.register('title', titleModule(), {id:'app-title', title:'korn microkernel demo'})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="app-title"></div>
    <div id="grid"></div>
  </div>
`

kornel.run();
