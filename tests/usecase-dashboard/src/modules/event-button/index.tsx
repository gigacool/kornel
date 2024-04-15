import { ICommunicationBus, IModule } from 'kornel';

import './index.css';

// dirty demo code
// grab an id to create piece of rendering
// update rendering whenever an event goes through the bus

type WidgetProps = {
  bus: ICommunicationBus,
  properties:{
    title: string,
    channel: string
  }
}


export const eventButtonModule = function():IModule{
  let communicationBus:ICommunicationBus; 
  
  const EventButtonDashboardTile: React.FC<WidgetProps> = ({bus, properties}) => {
      const title = properties?.title || 'Count'; 
      const emitChannel = properties?.channel || '*';

      
      const onClick = () => {
        communicationBus.emit(emitChannel, {payload:'event'});
      }
    
      
      return (
        <div className='event-button-tile'>
          <h4>{title}</h4>
          <button onClick={onClick}>Emit event</button>
        </div>
      )
    }


    return {
        initialize:function(bus, options:{channel:string, title:string}):void {
          communicationBus = bus;
          communicationBus.emit('REGISTER_DASHBOARD_WIDGET', {
            payload:{
              id:'event-button-dashboard-tile',
              channel: options?.channel || '*', 
              widget:EventButtonDashboardTile, 
              title:options?.title,
              bus:bus
            }
          }
        )
        },
        start:function():void {
          // nop
        }
      }
  } 