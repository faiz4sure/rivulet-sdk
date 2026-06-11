# Rivulet SDK

The official Deno-based SDK for building streaming providers for the Rivulet platform.

## Installation

You can import the SDK directly in your Deno project via NPM:

```typescript
// You can use npm: specifiers directly in Deno without needing an install command!
import { servePlugins } from "npm:rivulet-sdk";
import myProvider from "./providers/myProvider.ts";

servePlugins([myProvider]);
```

*Note: The SDK relies on `kkrpc`. Deno will automatically detect the `npm:kkrpc` import inside the SDK source code and download it for you automatically. You do not need to install it manually!*
