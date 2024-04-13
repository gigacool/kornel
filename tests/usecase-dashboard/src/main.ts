import './style.css'

import { Kornel, BusInterface, ModuleInterface } from 'kornel';

import { titleModule } from './modules/title';
import { dashboardModule } from './modules/dashboard';
import { LogTileWidget } from './modules/dashboard-log';
import { TodoModule } from './modules/todo';

const kornel = new Kornel().create();

function eventPushModule():ModuleInterface{

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
  }
}

kornel.register('grid', dashboardModule(), {id:'grid'});
{
  kornel.register('grid-log-tile', LogTileWidget());
}
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
