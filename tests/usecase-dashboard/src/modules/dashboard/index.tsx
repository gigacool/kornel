import { ICommunicationBus, IModule } from 'kornel';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Grid } from './Grid';

// dirty demo code
// render a dashboard full of widgets
// widgets are registered via the REGISTER_DASHBOARD_WIDGET message

export type Widgets = Record<string, React.FC>;

export const dashboardModule = function():IModule {
    let communicationBus:ICommunicationBus; 
    let id:string = '';

    let widgets:Widgets = {};

    return {
        initialize:function(bus, options:{id:string}):void {
            communicationBus = bus;
            id = options.id;

            communicationBus.listen('REGISTER_DASHBOARD_WIDGET', (_channel:string, payload:{id:string, widget:React.FC}) => {
                let id:string = payload.id;
                widgets[id] = payload.widget; 
            });




            
        },
        start:function(){
            let element = document.getElementById(id);
            if (element){
                ReactDOM.createRoot(element).render(
                <React.StrictMode>
                    <Grid widgets={widgets}  bus={communicationBus} />
                </React.StrictMode>,
                )
            }
        }
    }
};
