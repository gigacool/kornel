

import { Payload } from "../PayloadInterface";

type CallbackFunction = (payload:string) => void;
type Channels = Record<string, CallbackFunction[]>; 

export class Bus {

    private channels:Channels;

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
        this.channels[channel].forEach(function(callback){
            try {
                callback(payload.payload);
            } catch(error){
                console.error(`callback threw while running`);
                console.error(error);
            }
        })
    }
}