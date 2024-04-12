import { BusInterface, CallbackFunction, ModuleInterface } from 'kornel';

// dirty demo code
// render a dashboard full of widgets
// widgets are registered via the REGISTER_DASHBOARD_WIDGET message

type PayloadDashboardWidget = {
    id:string,
    widget:Function
}

export interface WidgetInterface {
    
};

type Widgets = Record<string, WidgetInterface>;

export const dashboardModule = function():ModuleInterface {
    let communicationBus:BusInterface; 
    let id:string = '';
    
    let widgets:Widgets = {};

    return {
        initialize:function(bus, options:{id:string}):void {
            communicationBus = bus;
            id = options.id;

            bus.listen('REGISTER_DASHBOARD_WIDGET', (payload:{id:string, widget:PayloadDashboardWidget}) => {
                let id:string = payload.id;
                widgets[id] = payload.widget; 
            });

            

        }
    }
};
