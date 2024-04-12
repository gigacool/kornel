import './style.css'

import { Kornel, BusInterface, ModuleInterface } from 'kornel';

import { titleModule } from './modules/title';

const kornel = new Kornel().create();

function eventPushModule():ModuleInterface{

  return {
    initialize(bus, options:{}) {
      // setInterval(()=>{
      //   console.log('emit' )
      //   bus.emit('test', {payload:'some event'});
      // }, 2000);
    },
  }
}

kornel.register('title', titleModule(), {id:'app-title', title:'korn microkernel demo'})
kornel.register('randEvent', eventPushModule())

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="app-title"></div>
    <div class="grid">
    </div>
  </div>
`

kornel.run();


// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
