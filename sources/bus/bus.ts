

import { Payload } from "../PayloadInterface";
import { BusInterface, CallbackFunction } from "./BusInterface";
export { BusInterface, CallbackFunction } from "./BusInterface";

export class Bus implements BusInterface {

    private channels:Record<string, CallbackFunction[]>;

    constructor(){
        this.channels = {};
    }

    listen(channel:string, callback:CallbackFunction):Bus {
        if (!this.channels[channel]){
            this.channels[channel] = [];
        }

        if (this.channels[channel].find((c) => c === callback)){
            console.error(`callback is already listening on channel "${channel}"`)
            return this;
        }

        this.channels[channel].push(callback);
        return this;
    }

    emit(channel:string, payload:Payload):void {
        (this.channels[channel] || []).forEach(function(callback:CallbackFunction){
            try {
                callback(channel, payload.payload);
            } catch(error){
                console.error(`callback threw while running`);
                console.error(error);
            }
        })
        
        if (channel !== '*'){
            this.emit('*', payload);
        }
    }
}