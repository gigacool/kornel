import { ICommunicationBus, IModule } from 'kornel';
import React, { useState, useEffect } from 'react';

// dirty demo code
// grab an id to create piece of rendering
// update rendering whenever an event goes through the bus

interface LogItem {
  timestamp: number;
  channel: string;
  log: string;
}

export const LogTileWidget = function():IModule{
  let communicationBus:ICommunicationBus; 

  const LogTile: React.FC = () => {
    
    const [items, setItems] = useState<LogItem[]>([]);

    const handlePropChange = (channel:string, newValue:any) => {
      const newEntry = {
        timestamp:Date.now(), 
        channel:channel, 
        log:JSON.stringify(newValue)
      };
      setItems((prevItems) => {
        return [newEntry, ...prevItems];
      });
    };

    useEffect(() => {
      communicationBus.subscribe('*', handlePropChange);
      return () => {};
    }, []); 

      return (
        <div className="log-tile">
          <h4>Logs</h4>
          <ul>
            {items.map((item)=>
              <li key={item.timestamp}>
                <em>{new Date(item.timestamp).toISOString()}</em>
                &nbsp;
                <em>{item.channel}</em>
                &nbsp;
                {item.log}
              </li>
            )}
          </ul>
        </div>
      )
    }

    return {
        initialize:function(bus):void {
          communicationBus = bus;
          bus.publish('REGISTER_DASHBOARD_WIDGET', {id:'log-tile', widget:LogTile})
        },
        start:function():void {
          // nop
        }
      }
  } 