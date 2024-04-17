import { ICommunicationBus, Callback, Payload } from "../types/index";

export class Bus implements ICommunicationBus {

    private channels:Record<string, Callback[]>;

    constructor(){
        this.channels = {};
    }

    subscribe(channel:string, callback:Callback):Bus {
        if (!this.channels[channel]){
            this.channels[channel] = [];
        }

        if (this.channels[channel].find((c) => c === callback)){
            console.error(`callback is already subscribeing on channel "${channel}"`)
            return this;
        }

        this.channels[channel].push(callback);
        return this;
    }

    publish(channel:string, payload:Payload):void {
        (this.channels[channel] || []).forEach(function(callback:Callback){
            try {
                callback(channel, payload.payload);
            } catch(error){
                console.error(`callback threw while running`);
                console.error(error);
            }
        });
        
        (this.channels['*'] || []).forEach(function(callback:Callback){
            try {
                callback(channel, payload.payload);
            } catch(error){
                console.error(`callback threw while running`);
                console.error(error);
            }
        });

    }
}