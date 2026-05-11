# @orquex/sagas-types

Type definitions and domain models for Orquex Sagas. This package provides the core TypeScript interfaces and types used to define and validate saga-based workflows within the Orquex ecosystem.

## Installation

```bash
npm install @orquex/sagas-types
```

or with yarn:

```bash
yarn add @orquex/sagas-types
```

## Usage

This package provides types for Flows, Stages, Tasks, and Resources.

```typescript
import { Flow, Stage, Task } from '@orquex/sagas-types';

const myFlow: Flow = {
  id: 'my-workflow',
  name: 'Sample Workflow',
  stages: [
    // ... stage definitions
  ]
};
```

## Development

### Building

```bash
npm run build
```

### Versioning and Publishing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelogs.

1. Create a changeset:
   ```bash
   npx changeset
   ```
2. Follow the prompts to select the type of change (patch, minor, major).
3. Commit the generated changeset file.
4. When merged to `main`, a GitHub Action will automatically create a versioning PR or publish to NPM.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
