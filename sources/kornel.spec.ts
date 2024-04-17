import { IModule } from './types/index';
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

        const moduleListener:IModule = {
            initialize(bus) {
                bus.subscribe('test', onMessage);
            },
            start(){}
        }

        const moduleEmiter:IModule = {
            initialize(bus) {
                bus.publish('test', {payload:payload});
            },
            start(){}
        }
        kore.register('module-subscribeer', moduleListener);
        kore.register('module-publisher', moduleEmiter);

        kore.run();

        expect(onMessage).toHaveBeenCalledWith('test',{payload:payload});
        expect(onMessage).toHaveBeenCalledTimes(1);


    });
})