import { BusInterface, ModuleInterface } from 'kornel';

// dirty demo code
// grab an id to create piece of rendering
// update rendering whenever an event goes through the bus

export const titleModule = function():ModuleInterface{
    let communicationBus:BusInterface; 
    let count = 0;
    let title = 'no title yet';
    let id = '';
    
    function render():void {
        
      let element = document.getElementById(id);
      
      if (!element) { 
        return; 
      }
      
      element.innerHTML=`
      <h1>${title}</h1>
      <h3>number of messages since session start: <em>${count}</em></h3>
      `; 
    }
    
    return {
        initialize:function(bus, options:{id:string, title:string}):void {
          communicationBus = bus;
          id = options.id;
          title = options.title;
        
          
  
          bus.listen('*', ()=>{
            count++;
            render()
          })
        },
        start:function():void {
          render();
        }
      }
  } 