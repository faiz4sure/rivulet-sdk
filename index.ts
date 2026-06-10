export * from "./builders/PluginBuilder.ts";
export * from "./builders/ResponseBuilders.ts";
export * from "./types.ts";

import { DenoIo, RPCChannel } from "npm:kkrpc/deno";
import type { ProviderApi, RivuletPlugin } from "./types.ts";

export function servePlugins(providers: ProviderApi[]) {
  const providerMap = new Map<string, ProviderApi>();

  for (const provider of providers) {
    if (!provider.id) {
      console.error(`[SDK] Provider is missing an 'id'. It will not be accessible.`);
      continue;
    }
    providerMap.set(provider.id, provider);
  }

  const orchestratorAPI: RivuletPlugin = {
    async getProviders() {
      return Array.from(providerMap.values()).map(p => ({
        id: p.id,
        name: p.name
      }));
    },

    async getHomePage(providerName: string, page: number, request?: any) {
      try {
        const provider = providerMap.get(providerName);
        if (provider && typeof provider.getHomePage === "function") {
          return await provider.getHomePage(page, request);
        }
        throw new Error(`Provider '${providerName}' is missing or getHomePage not implemented.`);
      } catch (err) {
        return { error: true, message: String(err) } as any;
      }
    },

    async search(providerName: string, query: string, page?: number) {
      try {
        const provider = providerMap.get(providerName);
        if (provider && typeof provider.search === "function") {
          return await provider.search(query, page);
        }
        throw new Error(`Provider '${providerName}' is missing or search not implemented.`);
      } catch (err) {
        return { error: true, message: String(err) } as any;
      }
    },

    async load(providerName: string, url: string) {
      try {
        const provider = providerMap.get(providerName);
        if (provider && typeof provider.load === "function") {
          return await provider.load(url);
        }
        throw new Error(`Provider '${providerName}' is missing or load not implemented.`);
      } catch (err) {
        return { error: true, message: String(err) } as any;
      }
    },

    async loadLinks(providerName: string, data: string) {
      try {
        const provider = providerMap.get(providerName);
        if (provider && typeof provider.loadLinks === "function") {
          return await provider.loadLinks(data);
        }
        throw new Error(`Provider '${providerName}' is missing or loadLinks not implemented.`);
      } catch (err) {
        return { error: true, message: String(err) } as any;
      }
    },
  };

  const io = new DenoIo(Deno.stdin.readable);
  new RPCChannel(io, { expose: orchestratorAPI });
}
