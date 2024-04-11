import { ModuleInterface } from './ModuleInterface';
import { Kore } from './kore/kore';
import Kornel  from './kornel';

describe('library interation test', function(){

    it('should be defined', function(){
        expect(typeof Kornel).toBe('function');
    });

    it('should return a Kore instance via factory pattern', function(){
        const factory = new Kornel();
        const kore = factory.create();

        expect(kore instanceof Kore).toBe(true);
    });

    
    it('should return a Kore instance with a bus via factory pattern', function(){
        const factory = new Kornel();
        const kore = factory.create();
        
        const onMessage = jest.fn();
        const payload = JSON.stringify({test:'test', data:'json data'});

        const moduleListener:ModuleInterface = {
            initialize(bus) {
                bus.listen('test', onMessage);
            }
        }

        const moduleEmiter:ModuleInterface = {
            initialize(bus) {
                bus.emit('test', {payload:payload});
            },
        }
        kore.register('module-listener', moduleListener);
        kore.register('module-emiter', moduleEmiter);

        kore.run();

        expect(onMessage).toHaveBeenCalledWith(payload);
        expect(onMessage).toHaveBeenCalledTimes(1);


    });
})