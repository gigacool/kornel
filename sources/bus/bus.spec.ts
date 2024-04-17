import { Bus } from './bus';

describe('bus component enabling communication accross modules', function(){

    it('should be defined', function(){
        expect(typeof Bus).toBe('function');
    });
    
    describe('subscribe', function(){
        
        let bus:Bus;

        beforeEach(function(){
            bus = new Bus();
        })

        it('should be defined', function(){
            expect(typeof bus.subscribe).toBe('function');
        });

        it('should register a callback for a given message channel', function(){
            const callback = jest.fn();

            bus.subscribe('general', callback);

            bus.publish('general', {payload:'is subscribeing'})
            expect(callback).toHaveBeenCalledWith('general','is subscribeing');
        });

        it('should register a callback for all channels when using star wildcard', function(){
            const callback = jest.fn();
            const callbackForAll = jest.fn();

            bus.subscribe('general', callback);
            bus.subscribe('*', callbackForAll);

            bus.publish('general', {payload:'is subscribeing'})
            expect(callbackForAll).toHaveBeenCalledWith('general','is subscribeing');
        });

        it('should register multiple callbacks for a given message channel', function(){
            const callback = jest.fn();
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            bus.subscribe('general', callback);
            bus.subscribe('general', callback1);
            bus.subscribe('general', callback2);

            // FIFO list
            bus.publish('general', {payload:'is subscribeing'})
            expect(callback).toHaveBeenCalledWith('general','is subscribeing');
            expect(callback1).toHaveBeenCalledWith('general','is subscribeing');
            expect(callback2).toHaveBeenCalledWith('general','is subscribeing');
        });

        it('should not register multiple times the same callbacks for a given message channel', function(){
            const callback = jest.fn();
            const logError = jest.spyOn(console, 'error');

            bus.subscribe('general', callback);
            bus.subscribe('general', callback);
            bus.subscribe('general', callback);

            bus.publish('general', {payload:'is subscribeing'})
            expect(callback).toHaveBeenCalledTimes(1)
            expect(callback).toHaveBeenCalledWith('general','is subscribeing');
            expect(logError).toHaveBeenCalledWith('callback is already subscribeing on channel "general"')
            expect(logError).toHaveBeenCalledTimes(2);
        });

        it('should enable chaining capability', function(){
            const output = bus.subscribe('general', jest.fn());

            expect(output).toBe(bus);
        });

        it('should enable chaining capability while failing', function(){
            const callback = jest.fn();
            bus.subscribe('general', callback);
            
            const output = bus.subscribe('general', callback);
            
            expect(output).toBe(bus);
        });

    });

    describe('publish', function(){
        
        let bus:Bus;

        beforeEach(function(){
            bus = new Bus();
            jest.clearAllMocks();        
        })

        it('should be defined', function(){
            expect(typeof bus.publish).toBe('function');
        });

        it('should not crash when publishing on unknown channel', function(){
            bus.publish('unknown', {payload:'some message'})
        });

        it('should be calling the callbacks registered for given channel', function(){
            const callback = jest.fn();
            const callback1 = jest.fn();
            bus.subscribe('general', callback);
            bus.subscribe('general', callback1);

            bus.publish('general', {payload:'some message'})

            expect(callback).toHaveBeenCalledWith('general','some message');
            expect(callback1).toHaveBeenCalledWith('general', 'some message');
        });
       
        it('should be calling the callbacks registered for given channel even if one fails', function(){
            const callback =  jest.fn().mockImplementation(() => {
                throw new Error('did not go well at roswell');
            });
            const callback1 = jest.fn();
            bus.subscribe('general', callback);
            bus.subscribe('general', callback1);
            const logError = jest.spyOn(console, 'error');
            expect(logError).toHaveBeenCalledTimes(0);

            bus.publish('general', {payload:'some message'})
            
            expect(logError).toHaveBeenCalledWith('callback threw while running')
            expect(logError).toHaveBeenCalledTimes(2);
            expect(callback).toHaveBeenCalledWith('general','some message');
            expect(callback1).toHaveBeenCalledWith('general','some message');
        });

        it('should be calling the callbacks registered for * channel even if one fails', function(){
            const callback =  jest.fn().mockImplementation(() => {
                throw new Error('did not go well at roswell');
            });
            const callback1 = jest.fn();
            bus.subscribe('*', callback);
            bus.subscribe('*', callback1);
            const logError = jest.spyOn(console, 'error');
            expect(logError).toHaveBeenCalledTimes(0);

            bus.publish('general', {payload:'some message'})
            
            expect(logError).toHaveBeenCalledWith('callback threw while running')
            expect(logError).toHaveBeenCalledTimes(2);
            expect(callback).toHaveBeenCalledWith('general','some message');
            expect(callback1).toHaveBeenCalledWith('general','some message');
        });


    });

});