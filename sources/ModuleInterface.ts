import { BusInterface } from "./bus/BusInterface";
import { Options } from "./OptionsInterface";

export interface ModuleInterface {
    initialize(bus:BusInterface, options?:Options):void;
    start():void;
}