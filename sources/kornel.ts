import { Bus } from './bus/bus';
import { Kore } from './kore/kore';

export { BusInterface, CallbackFunction } from './bus/bus';
export { ModuleInterface } from './ModuleInterface';
export { Options } from './OptionsInterface';

export class Kornel {
    
    create():Kore {
        const bus:Bus = new Bus();
        const kore:Kore = new Kore(bus);
    
        return kore;
    }
};

export default Kornel;