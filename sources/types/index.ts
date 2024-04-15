/** Communication Bus interface */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Callback = (channel:string, payload:any) => void;

export interface ICommunicationBus {
    listen(channel:string, callback:Callback):ICommunicationBus;
    emit(channel:string, payload:Payload):void;
}
export type Options = Record<string,unknown>;

export interface IModule {
    initialize(bus:ICommunicationBus, options?:Options):void;
    start():void;
}

export interface Payload {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload:any
}
