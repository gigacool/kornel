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

        it('should register a callback for a given message channel', function(){
            const callback = jest.fn();

            bus.listen('general', callback);

            bus.emit('general', {payload:'is listening'})
            expect(callback).toHaveBeenCalledWith('is listening');
        });

        it('should register multiple callbacks for a given message channel', function(){
            const callback = jest.fn();
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            bus.listen('general', callback);
            bus.listen('general', callback1);
            bus.listen('general', callback2);

            // FIFO list
            bus.emit('general', {payload:'is listening'})
            expect(callback).toHaveBeenCalledWith('is listening');
            expect(callback1).toHaveBeenCalledWith('is listening');
            expect(callback2).toHaveBeenCalledWith('is listening');
        });

        it('should not register multiple times the same callbacks for a given message channel', function(){
            const callback = jest.fn();
            const logError = jest.spyOn(console, 'error');

            bus.listen('general', callback);
            bus.listen('general', callback);
            bus.listen('general', callback);

            bus.emit('general', {payload:'is listening'})
            expect(callback).toHaveBeenCalledTimes(1)
            expect(callback).toHaveBeenCalledWith('is listening');
            expect(logError).toHaveBeenCalledWith('callback is already listening on channel "general"')
            expect(logError).toHaveBeenCalledTimes(2);
        });

        it('should enable chaining capability', function(){
            const output = bus.listen('general', jest.fn());

            expect(output).toBe(bus);
        });

        it('should enable chaining capability while failing', function(){
            const callback = jest.fn();
            bus.listen('general', callback);
            
            const output = bus.listen('general', callback);
            
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
            const callback = jest.fn();
            const callback1 = jest.fn();
            bus.listen('general', callback);
            bus.listen('general', callback1);

            bus.emit('general', {payload:'some message'})

            expect(callback).toHaveBeenCalledWith('some message');
            expect(callback1).toHaveBeenCalledWith('some message');
        });
       
        it('should be calling the callbacks registered for given channel even if one fails', function(){
            const callback =  jest.fn().mockImplementation(() => {
                throw new Error('did not go well at roswell');
            });
            const callback1 = jest.fn();
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