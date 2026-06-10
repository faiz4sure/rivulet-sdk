# Rivulet SDK

The official Deno-based SDK for building streaming providers for the Rivulet platform.

## Getting Started

In your plugin's `index.ts`:

```typescript
import { servePlugins } from "https://raw.githubusercontent.com/faiz4sure/rivulet-sdk/main/index.ts";
import myProvider from "./providers/myProvider.ts";

servePlugins([myProvider]);
```
