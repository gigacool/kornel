import { Kore } from './kore';

import { BusInterface } from '../bus/BusInterface';
import { ModuleInterface } from '../ModuleInterface';

describe('core component of the plugin orchhestrator', function(){

    it('should be defined', function(){
        expect(typeof Kore).toBe('function');
    })

    describe('register module', function(){

        let kore:Kore;
        let bus:BusInterface;

        beforeEach(function(){
            bus = {
                listen:jest.fn(),
                emit:jest.fn(),
            }
            kore = new Kore(bus);
        })

        it('should be defined', function(){
            expect(typeof kore.register).toBe('function');
        });

        it('should register a module', function(){
            const mockModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
              };
            
            kore.register('mock-module', mockModule);

            kore.run();
            expect(mockModule.initialize).toHaveBeenCalledTimes(1);
        });

        it('should accept an optional option property', function(){
            const mockModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
              };
            const options = {optionA:"value A", optionB:"Value B"};
            kore.register('mock-module', mockModule, options);

            kore.run();
            expect(mockModule.initialize).toHaveBeenCalledTimes(1);
            expect(mockModule.initialize).toHaveBeenCalledWith(bus, options);
        });

        it('should not register a module with duplicate identifier', function(){
            const okModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
            };
            const nokModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
            };
            const logError = jest.spyOn(console, 'error');
            kore.register('module', okModule);
            
            kore.register('module', nokModule);

            kore.run();
            expect(okModule.initialize).toHaveBeenCalledTimes(1);
            expect(nokModule.initialize).toHaveBeenCalledTimes(0);
            expect(logError).toHaveBeenCalledWith(`A module has already been registered with module identifier "module". Second module will not be registered`);
            logError.mockReset();
        });

        it('should enable chaining capability', function(){
            const mockModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
              };
            
            const output = kore.register('mock-module', mockModule);

            expect(output).toBe(kore);
        });

        
        it('should enable chaining capability when registering fails', function(){
            const okModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
            };
            const nokModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
            };
            
            kore.register('mock-module', okModule);
            const output = kore.register('mock-module', nokModule);

            expect(output).toBe(kore);
        });

    });

    describe('run modules', function(){

        let kore:Kore;
        let bus:BusInterface;

        beforeEach(function(){
            bus = {
                listen:jest.fn(),
                emit:jest.fn(),
            }
            kore = new Kore(bus);
        })

        it('should be defined', function(){
            expect(typeof kore.run).toBe('function');
        });

        it('should do nothing if no modules are registered', function(){
            kore.run();
        });

        it('should run initialize method of a single module registered', function(){

            const callOrder:string[] = [];
            const mockModule: ModuleInterface = {
                initialize: jest.fn().mockImplementation(() => callOrder.push('init')),
                start:jest.fn().mockImplementation(() => callOrder.push('start'))
              };
            kore.register('mock-module', mockModule);

            kore.run();

            expect(mockModule.initialize).toHaveBeenCalledTimes(1);
            expect(mockModule.initialize).toHaveBeenCalledWith(bus, undefined)

            expect(mockModule.start).toHaveBeenCalledTimes(1);
            expect(callOrder).toEqual(['init', 'start']);
        });
        
        it('should run initialize method of multiple modules registered', function(){
            const modules = [];
            for(let i = 0; i < 3; i++){
                const mockModule: ModuleInterface = {
                    initialize: jest.fn(),
                    start:jest.fn()
                  };
                kore.register('mock-module-'+i, mockModule);
                modules.push(mockModule);
            }
            
            kore.run();

            for(let i=0; i<modules.length;i++){
                expect(modules[i].initialize).toHaveBeenCalledTimes(1);
                expect(modules[i].initialize).toHaveBeenCalledWith(bus, undefined)

            }
        });

        it('should try and initialize despite failing modules', function(){
            const mockModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
            };
            const faultyModule: ModuleInterface = {
                initialize: jest.fn().mockImplementation(() => {
                    throw new Error('Some initialization error');
                }),
                start:jest.fn()
            };
            const logError = jest.spyOn(console, 'error');
            kore.register('mock-module', mockModule);
            kore.register('faulty-module', faultyModule);

            kore.run();

            expect(mockModule.initialize).toHaveBeenCalledTimes(1);
            expect(logError).toHaveBeenCalledWith(`"faulty-module" failed to initialize`);
            logError.mockReset();
        });

        it('should try and start despite failing modules', function(){
            const mockModule: ModuleInterface = {
                initialize: jest.fn(),
                start:jest.fn()
            };
            const faultyModule: ModuleInterface = {
                initialize:jest.fn(),
                start: jest.fn().mockImplementation(() => {
                    throw new Error('Some initialization error');
                }),
            };
            const logError = jest.spyOn(console, 'error');
            kore.register('mock-module', mockModule);
            kore.register('faulty-module', faultyModule);

            kore.run();

            expect(mockModule.initialize).toHaveBeenCalledTimes(1);
            expect(logError).toHaveBeenCalledWith(`"faulty-module" failed to start`);
            logError.mockReset();
        });


    });

});