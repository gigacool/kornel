import { Kore } from './kore';

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
        })

    });

});