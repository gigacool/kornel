
import { ICommunicationBus, Options, IModule } from '../kornel';

type Modules = Record<string, { module: IModule, options?: Options }>;

export class Kore {

    private modules: Modules;
    private bus: ICommunicationBus;

    constructor(bus: ICommunicationBus) {
        this.modules = {};
        this.bus = bus;
    }

    register(identifier: string, module: IModule, options?: Options): Kore {
        if (this.modules[identifier]) {
            console.error(`A module has already been registered with module identifier "${identifier}". Second module will not be registered`)
            return this;
        }
        this.modules[identifier] = { module: module, options: options };
        return this;
    }

    run(): void {
        Object // initialize all modules
            .entries(this.modules)
            .forEach(([moduleIdentifier, moduleRegistry]) => {
                try {
                    moduleRegistry.module.initialize(this.bus, moduleRegistry.options);
                } catch (error) {
                    console.error(`"${moduleIdentifier}" failed to initialize`)
                }
            })
        Object // then start the modules
            .entries(this.modules)
            .forEach(([moduleIdentifier, moduleRegistry]) => {
                try {
                    moduleRegistry.module.start();
                } catch (error) {
                    console.error(`"${moduleIdentifier}" failed to start`)
                }
            })
    }
}

