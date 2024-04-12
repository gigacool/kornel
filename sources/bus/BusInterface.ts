import { Payload } from "../PayloadInterface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallbackFunction = (payload:any) => void;

export interface BusInterface {
    listen(channel:string, callback:CallbackFunction):BusInterface;
    emit(channel:string, payload:Payload):void;
}