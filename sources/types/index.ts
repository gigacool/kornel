/** Calback type refers to callback functions used when communicating via the communication bus */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Callback = (channel:string, payload:any) => void;

/** The communication bus interfaces describbe the functions available to subscribe to, and publish messages. */
export interface ICommunicationBus {
    subscribe(channel:string, callback:Callback):ICommunicationBus;
    publish(channel:string, payload:Payload):void;
}

/** Option type refers to the generic data structure provided to the module while initializing. 
 * This structure corresponds to the module API specific needs, in short, the options needed to make it work. 
 */
export type Options = Record<string,unknown>;

/** The Module interface describes the requierd functions and according signatures. 
 * Initialize functions are called for all the modules, then, start functions are called as well. 
 * Running order depends on registration order: First-in First-out.
 */
export interface IModule {
    /** Setup the module as needed, e.g. subscribe to communication channels, load options, fetch data, etc.*/
    initialize(bus:ICommunicationBus, options?:Options):void;
    /** Get the module to actually start working */
    start():void;
}

/** Payload interface describes the parameters provided when publishing a message */
export type Payload = Record<string, unknown>;
