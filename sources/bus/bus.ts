
type Channels = Record<string, Function>; 

export class Bus {

    channels:Channels;

    constructor(){
        this.channels = {};
    }

    listen(channel:string, callback:Function):void {
        this.channels[channel] = callback;
    }
}