import { ICommunicationBus, IModule } from 'kornel';

let communicationBus:ICommunicationBus;

export const helloWorld:IModule = {
  initialize: function(bus): void {
    communicationBus = bus;
    communicationBus.subscribe('helloWorld', (_channel, payload) => alert(payload.message));
  },
  start: function (): void {
    // example usage
    // communicationBus.publish('helloWorld', {message:'Bonjour le monde'});
  }
};