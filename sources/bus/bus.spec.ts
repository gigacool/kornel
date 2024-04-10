import { Bus } from './bus';

describe('bus component enabling communication accross modules', function(){

    it('should be defined', function(){
        expect(typeof Bus).toBe('function');
    });
    
    describe('listen', function(){
        
        let bus:Bus;

        beforeEach(function(){
            bus = new Bus();

        })

        it('should be defined', function(){
            expect(typeof bus.listen).toBe('function');
        });

        it('should register a callback for a given message domain', function(){
            let callback = jest.fn();

            bus.listen('general', callback);

            expect(bus.channels['general']).toBe(callback);
        });

    });

    describe('emit', function(){

    });

});