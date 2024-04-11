import { BusInterface } from "./bus/BusInterface";

export interface ModuleInterface {
    initialize(bus:BusInterface):void;
}