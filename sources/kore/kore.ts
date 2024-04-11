import { ModuleInterface } from '../ModuleInterface';
import { BusInterface } from '../bus/BusInterface';
import { Options } from '../OptionsInterface';

type Modules = Record<string, {module:ModuleInterface, options?:Options}>; 

export class Kore {

    private modules: Modules;
    private bus:BusInterface;

    constructor(bus:BusInterface){
        this.modules = {};
        this.bus = bus;
    }

    register(identifier:string, module:ModuleInterface, options?:Options): Kore {
        if (this.modules[identifier]){
            console.error(`A module has already been registered with module identifier "${identifier}". Second module will not be registered`)
            return this;
        }
        this.modules[identifier] = {module:module, options:options};
        return this;
    }

    run():void {
        Object
            .entries(this.modules)
            .forEach(([moduleIdentifier, moduleRegistry])=>{
                try {
                    moduleRegistry.module.initialize(this.bus, moduleRegistry.options);
                } catch(error){
                    console.error(`"${moduleIdentifier}" failed to initialize`)
                }
            })
    }
}

 