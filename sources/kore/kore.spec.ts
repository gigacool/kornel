import { Kore } from './kore';

import { ModuleInterface } from '../ModuleInterface';

describe('core component of the plugin orchhestrator', function(){

    it('should be defined', function(){
        expect(typeof Kore).toBe('function');
    })

    describe('register module', function(){

        let kore:Kore;

        beforeEach(function(){
            kore = new Kore();

        })

        it('should be defined', function(){
            expect(typeof kore.register).toBe('function');
        });

        it('should register a module', function(){
            const mockModule: ModuleInterface = {
                initialize: jest.fn()
              };
            
            kore.register('mock-module', mockModule);

            expect(kore.modules['mock-module']).toBe(mockModule);
        });

        it('should not register a module with duplicate identifier', function(){
            const okModule: ModuleInterface = {
                initialize: jest.fn()
            };
            const nokModule: ModuleInterface = {
                initialize: jest.fn()
            };
            const logError = jest.spyOn(console, 'error');
            kore.register('module', okModule);
            
            kore.register('module', nokModule);

            expect(kore.modules['module']).toBe(okModule);
            expect(logError).toHaveBeenCalledWith(`A module has already been registered with module identifier "module". Second module will not be registered`);
        });

        it('should enable chaining capability', function(){
            const mockModule: ModuleInterface = {
                initialize: jest.fn()
              };
            
            let output = kore.register('mock-module', mockModule);

            expect(output).toBe(kore);
        });

        
        it('should enable chaining capability when registering fails', function(){
            const okModule: ModuleInterface = {
                initialize: jest.fn()
            };
            const nokModule: ModuleInterface = {
                initialize: jest.fn()
            };
            
            kore.register('mock-module', okModule);
            let output = kore.register('mock-module', nokModule);

            expect(output).toBe(kore);
        });

    });

    describe('run modules', function(){

        let kore:Kore;

        beforeEach(function(){
            kore = new Kore();
        })

        it('should be defined', function(){
            expect(typeof kore.run).toBe('function');
        });

        it('should do nothing if no modules are registered', function(){
            kore.run();
        });

        it('should run initialize method of a single module registered', function(){
            const mockModule: ModuleInterface = {
                initialize: jest.fn()
              };
            kore.register('mock-module', mockModule);

            kore.run();

            expect(mockModule.initialize).toHaveBeenCalledTimes(1);
        });
    });

});