

import { Payload } from "../PayloadInterface";

export type CallbackFunction = (payload:any) => void;

export interface BusInterface {
    listen(channel:string, callback:CallbackFunction):BusInterface;
    emit(channel:string, payload:Payload):void;
}