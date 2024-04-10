import { ModuleInterface } from '../ModuleInterface';

type Modules = Record<string, ModuleInterface>; 

export class Kore {

    modules: Modules;

    constructor(){
        this.modules = {};
    }

    register(identifier:string, module:ModuleInterface): void {
        if (this.modules[identifier]){
            console.error(`A module has already been registered with module identifier "${identifier}". Second module will not be registered`)
            return;
        }
        this.modules[identifier] = module;
    }
}

 