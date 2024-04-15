import './style.css'

import { Kornel, ICommunicationBus, IModule } from 'kornel';

import { titleModule } from './modules/title';
import { dashboardModule } from './modules/dashboard';
import { LogTileWidget } from './modules/dashboard-log';
import { TodoModule } from './modules/todo';
import { countModule } from './modules/counter';
import { eventButtonModule } from './modules/event-button';

const kornel = new Kornel().create();

function eventPushModule():IModule{

  return {
    initialize(bus) {
      // for(let i = 0; i< 10; i++){
      //   (function(i:number){
      //     setTimeout(()=>{
      //       bus.emit('test', {payload:'some event '+i});
      //     }, i*100)
      //   })(i);
      // }
    },
    start(){
      
    }
  }
}

kornel.register('grid', dashboardModule(), {id:'grid'});
{
  kornel.register('grid-log-tile', LogTileWidget());
}
kornel.register('count-event-tile', countModule());
kornel.register('event=button-tile', eventButtonModule());
kornel.register('grid-todo', TodoModule());
kornel.register('title', titleModule(), {id:'app-title', title:'korn microkernel demo'})
kornel.register('randEvent', eventPushModule());


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="app-title"></div>
    <div id="grid"></div>
  </div>
`

kornel.run();


// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
