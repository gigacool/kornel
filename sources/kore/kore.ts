import { ModuleInterface } from '../ModuleInterface';

type Modules = Record<string, ModuleInterface>; 

export class Kore {

    modules: Modules;

    constructor(){
        this.modules = {};
    }

    register(identifier:string, module:ModuleInterface): Kore {
        if (this.modules[identifier]){
            console.error(`A module has already been registered with module identifier "${identifier}". Second module will not be registered`)
            return this;
        }
        this.modules[identifier] = module;
        return this;
    }

    run():void {
        Object
            .entries(this.modules)
            .forEach(([moduleIdentifier, module])=>{
                try {
                    module.initialize();
                } catch(error){
                    console.error(`"${moduleIdentifier}" failed to initialize`)
                }
            })
    }
}

 