import { ICommunicationBus, IModule } from 'kornel';
import { useEffect, useState } from 'react';

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

export const countModule = function():IModule{
  let communicationBus:ICommunicationBus; 
  
  const CountDashboardTile: React.FC<WidgetProps> = ({bus, properties}) => {
      const title = properties?.title || 'Count'; 
      const listenChannel = properties?.channel || '*';

      const [count, setCount] = useState(0);

      const handlePropChange = (channel:string) => {
        console.log('channel', channel, properties?.channel);
        
        if (listenChannel === '*'){
          setCount(count+1);
          return;
        }
        
        if (listenChannel === channel){
          setCount(count+1);
          return;
        }
        
      }
    
      communicationBus.listen(listenChannel, handlePropChange);
      useEffect(() => {
        return () => {};
      }, []);
      
      return (
        <div className='count-tile'>
          <h4>{title}</h4>
          <div className='metric'>{count}</div>
        </div>
      )
    }

    return {
        initialize:function(bus, options:{channel:string, title:string}):void {
          communicationBus = bus;
          console.log('resitering counter')
          communicationBus.emit('REGISTER_DASHBOARD_WIDGET', {
            payload:{
              id:'count-dashboard-tile',
              channel: options?.channel || '*', 
              widget:CountDashboardTile, 
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