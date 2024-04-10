import { Bus } from './bus';

// TODO - update tests to enable black box testing instead

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

        it('should register a callback for a given message channel', function(){
            let callback = jest.fn();

            bus.listen('general', callback);

            expect(bus.channels['general']).toEqual([callback]);
        });

        it('should register multiple callbacks for a given message channel', function(){
            let callback = jest.fn();
            let callback1 = jest.fn();
            let callback2 = jest.fn();

            bus.listen('general', callback);
            bus.listen('general', callback1);
            bus.listen('general', callback2);

            // FIFO list
            expect(bus.channels['general']).toEqual([callback, callback1, callback2]);
        });

        it('should not register multiple times the same callbacks for a given message channel', function(){
            let callback = jest.fn();
            const logError = jest.spyOn(console, 'error');

            bus.listen('general', callback);
            bus.listen('general', callback);
            bus.listen('general', callback);

            expect(bus.channels['general']).toEqual([callback]);
            expect(logError).toHaveBeenCalledWith('callback is already listening on channel "general"')
        });

        it('should enable chaining capability', function(){
            let output = bus.listen('general', jest.fn());

            expect(output).toBe(bus);
        });

        it('should enable chaining capability while failing', function(){
            let callback = jest.fn();
            bus.listen('general', callback);
            
            let output = bus.listen('general', callback);
            
            expect(output).toBe(bus);
        });

    });

    describe('emit', function(){
        
        let bus:Bus;

        beforeEach(function(){
            bus = new Bus();
            jest.clearAllMocks();        
        })

        it('should be defined', function(){
            expect(typeof bus.emit).toBe('function');
        });

        it('should be calling the callbacks registered for given channel', function(){
            let callback = jest.fn();
            let callback1 = jest.fn();
            bus.listen('general', callback);
            bus.listen('general', callback1);

            bus.emit('general', {payload:'some message'})

            expect(callback).toHaveBeenCalledWith('some message');
            expect(callback1).toHaveBeenCalledWith('some message');
        });
       
        it('should be calling the callbacks registered for given channel even if one fails', function(){
            let callback =  jest.fn().mockImplementation(() => {
                throw new Error('did not go well at roswell');
            });
            let callback1 = jest.fn();
            bus.listen('general', callback);
            bus.listen('general', callback1);
            const logError = jest.spyOn(console, 'error');
            expect(logError).toHaveBeenCalledTimes(0);

            bus.emit('general', {payload:'some message'})
            
            expect(logError).toHaveBeenCalledWith('callback threw while running')
            expect(logError).toHaveBeenCalledTimes(2);
            expect(callback).toHaveBeenCalledWith('some message');
            expect(callback1).toHaveBeenCalledWith('some message');
        });


    });

});