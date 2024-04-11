

import { Payload } from "../PayloadInterface";

export type CallbackFunction = (payload:string) => void;

export interface BusInterface {
    listen(channel:string, callback:CallbackFunction):BusInterface;
    emit(channel:string, payload:Payload):void;
}