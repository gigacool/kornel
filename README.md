# kornel

[![Build Status](https://github.com/gigacool/kornel/workflows/CI/badge.svg)](https://github.com/gigacool/kornel/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This repository contains a Micro Kernel library to build awesome &amp; scalable apps

## About

This project originated from an intuition: to investigate an underappreciated architecture pattern and deepen my understanding of TypeScript.

### Installation

```bash
npm install kornel
```

## Usage

```typescript
import kornel from 'kornel';

kornel.use();
//...
```

Kornel basically provides a module registering mechanism and a bus communication system. Fundamental API should be something like:

```typescript

/** Message callback */
type MessageCallback<T> = (payload: T) => void;

/** Define a type for subscription identifier */
type SubscriptionId = number;

/** MessageBus interface */
interface MessageBus {
    subscribe<T>(channels: string[], callback: MessageCallback<T>): SubscriptionId;
    unsubscribe(subscriptionId: SubscriptionId): void;
    publish<T>(channel: string, payload: T): void;
}

// ... 

/** Define a type for module registration */
interface ModuleRegistration {
    name: string;
    initialize: () => void;
    cleanup: () => void;
}

/** Define a type for module identifier */
type ModuleId = number;

/** Microkernel interface */
interface Microkernel {
    register(module: ModuleRegistration): ModuleId;
    start(): void;
}

```

## Getting started

This project is meant to uses
- **typescript**
- **rollup** and related plugins
- **jest**
- **eslint**

### Running unit tests

Unit tests can be run via the *test* command

```bash
npm run test
```

### Linting

Code quality can be checcked via the *lint* command

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




