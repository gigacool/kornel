import { ICommunicationBus, IModule } from 'kornel';

import './index.css';

// dirty demo code
// grab an id to create piece of rendering
// update rendering whenever an event goes through the bus


export const titleModule = function():IModule{
    let communicationBus:ICommunicationBus; 
    let count = 0;
    let title = 'no title yet';
    let id = '';
    let isEditing = false;

    function toggleEditMode(){
      isEditing = !isEditing;
      communicationBus.publish('GLOBAL_EDIT_MODE', {status:isEditing});
    }

    function render():void {
        
      let element = document.getElementById(id);
      
      if (!element) { 
        return; 
      }
      
      element.innerHTML=`
      <div class="title-area">
        <h1>${title}</h1>
        <h3>number of messages since session start: <em>${count}</em></h3>
        <div id="activate-page-edition" onClick="${toggleEditMode}">${isEditing ? 'stop':'start'} editing page</div>
      </div>`; 

      let editElement = document.getElementById('activate-page-edition');
      if (editElement){
        editElement.onclick = function(){toggleEditMode()};
      }
    }

    return {
        initialize:function(bus, options:{id:string, title:string}):void {
          communicationBus = bus;
          id = options.id;
          title = options.title;
        
          communicationBus.subscribe('*', ()=>{
            count++;
            render()
          })
        },
        start:function():void {
          render();
        }
      }
  } 