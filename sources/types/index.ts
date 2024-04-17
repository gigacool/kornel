/** Communication Bus interface */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/** Calback type refers to callback functions used when communicating via the communication bus */
export type Callback = (channel:string, payload:any) => void;

/** The communication bus interfaces describbe the functions available to subscribe to, and publish messages. */
export interface ICommunicationBus {
    subscribe(channel:string, callback:Callback):ICommunicationBus;
    publish(channel:string, payload:Payload):void;
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
