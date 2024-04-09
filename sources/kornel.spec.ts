import kornel from './kornel';

describe('setup test', function(){

    it('should return hello world', function(){
        expect(kornel.helloWorld()).toBe('Hello World');
    })
})