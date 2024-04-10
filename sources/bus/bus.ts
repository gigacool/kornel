
type Channels = Record<string, Function[]>; 

import { Payload } from "../PayloadInterface";

export class Bus {

    channels:Channels;

    constructor(){
        this.channels = {};
    }

    listen(channel:string, callback:Function):Bus {
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

    emit<T>(channel:string, payload:Payload<T>):void {
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