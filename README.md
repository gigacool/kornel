# kornel

[![Node.js CI](https://github.com/gigacool/kornel/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/gigacool/kornel/actions/workflows/node.js.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This project is a proof of concept for a microkernel based application (or more arguably plugin architecture). It consists of a library named **Kornel** with demonstration applications (so far only one). This library is not meant to actually support production apps, for now at least. 
The goal of this project is to explore the capabilities and limitations of microkernel architecture, patterns and others... and especially **scalability** of dev teams around a larger project.

From a more individual standpoint, it is also a foundation for me to explore **typescript** I barely got to use so far. I also wished to work applying bottom-up approach to **TDD** on the library. 

## About

A microkernel is an architectural pattern for an systems where the functionality are divided into small, modular services that may communicate with each other. The core of the system, the kernel, only provides the most essential services, and every other functionality is implemented as separate processes (as a module or a plugin). Operating systems widely use this architecture as well as multiple frameworks. 

Typical benefits of the microkernel pattern include increased modularity, security, and reliability. Since the functionalities are divided into separate processes, a failure in one process is not meant to affect the entire system: loose coupling is at the heart. Additionally, the modular design makes it easier to add or update functionality without affecting the rest of the system. It is a great pattern to build scalable and evolutive software that meets every users needs. 

Operating systems heavily rely on microkernel architecture patterns, numerous frameworks inspires from the modular aspect of microkernel architecture, etc. symphony php framework or java dropwizard are typical microkernel based software[^1]. 

[^1] Actual architecture of projects and understanding of them can be subject to discussion though ^^ 

## Getting started 

## Technical information

As mentioned in introduction, it is a proof of concept: an exploration to understand and demonstrate the concept. It is also a foundation for me to learn few other new things: 
- **typescript** I have been using lots of javascript, java and other languages including exotics. I never took the time to actually go through this technology to better understand strengths and limitations. I needed a projet not too complex nor simple to get a better grasp.
- **rollup** explore a new tool that was meant to bundle modules. 

I also use **Jest**, **eslint** and **React**. I am more used to those but not necessarily advanced practitionner.

In the future, if I pursue the experiment, I want to use this project to create 
- multi-framework demonstration application
- WebAssembly based features using e.g. python with ml capabilities (maybe)
- create a module dashboard app because dashboards are really cool apps 

### setup dev environment

> [!NOTE] NODEJS inside
> Project requires nodejs. It is built using **npm version 10.2.x** and **node 20.11.x**. It does not have strong adherences and should work with older versions.

Clone the repository or fork it. From project root, install dependencies using:

```bash 
> npm install 
```

#### Coding

You can run the tests and test coverage by default: 

```bash 
> npm run test
```

A watcher with only command line coverage can help during coding sessions:

```bash 
> npm run test-w
```

#### Building

Building the library will create the dist folder with code transpiled from typescript to a reusable javascript library and public types. 

Before building or commit, code quality can be checcked via the *lint* command.

```bash
npm run lint
```

```bash 
> npm run build
```

Github build actions includes both testing, linting and building. Code coverage could be checked as well but so far, I target > 95% so I care enough to not automate. Latest build can be found here: 

[![Node.js CI](https://github.com/gigacool/kornel/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/gigacool/kornel/actions/workflows/node.js.yml)


Upon build, files of interest will be:

```
dist/kornel.js,
dist/kornel.d.ts, 
```

### Using the library

#### main

Examples (1 so far :P) are demonstrated in the test folder, e.g. [./tests/usecase-dashboard/src/main.ts](./tests/usecase-dashboard/src/main.ts)

```typescript
import { Kornel } from 'kornel';

// create the kernel instance 
const kornel = new Kornel().create();

// register modules/plugins 
kornel.register('header', headerModule, {moduleProperties:'...'});
kornel.register('menu', menuModule);
kornel.register('auth', authModule);
kornel.register('support', supportModule);
// ... 

// start the application
kornel.run();
```

#### core APIs
The core is meant to provide fundamental mechanisms (registration, communication, possibly others but I focused on the first 2 for now). Public types and APIs are the following: 

```typescript
declare class Kore {
    private modules;
    private bus;
    constructor(bus: ICommunicationBus);
    register(identifier: string, module: IModule, options?: Options): Kore;
    run(): void;
}

/** Calback type refers to callback functions used when communicating via the communication bus */
type Callback = (channel: string, payload: any) => void;
/** The communication bus interfaces describbe the functions available to subscribe to, and publish messages. */
interface ICommunicationBus {
    subscribe(channel: string, callback: Callback): ICommunicationBus;
    publish(channel: string, payload: Payload): void;
}
/** Option type refers to the generic data structure provided to the module while initializing.
 * This structure corresponds to the module API specific needs, in short, the options needed to make it work.
 */
type Options = Record<string, unknown>;
/** The Module interface describes the requierd functions and according signatures.
 * Initialize functions are called for all the modules, then, start functions are called as well.
 * Running order depends on registration order: First-in First-out.
 */
interface IModule {
    /** Setup the module as needed, e.g. subscribe to communication channels, load options, fetch data, etc.*/
    initialize(bus: ICommunicationBus, options?: Options): void;
    /** Get the module to actually start working */
    start(): void;
}
/** Payload interface describes the parameters provided when publishing a message */
type Payload = Record<string, unknown>;

declare class Kornel {
    create(): Kore;
}
```

### example module 

> [!NOTE]
> example is in typescript, it could be javascript also and/or using any kind of framework, from raw, to svelte, angular, view, react, jquery, ember, etc. 

``` typescript
// in a file (e.g. Module.ts)
import { ICommunicationBus, IModule } from 'kornel';

let communicationBus:ICommunicationBus;

export const helloWorld:IModule = {
  initialize: function(bus): void {
    communicationBus = bus;
    communicationBus.subscribe('helloWorld', (_channel, payload) => alert(payload.message));
  },
  start: function (): void {
    communicationBus.publish('helloWorld', {message:'Bonjour le monde'});
  }
};
```

Here, the message is displayed upon application start. Another module could trigger the helloWorld message as well.

## Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




