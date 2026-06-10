import type { ProviderApi } from "../types.ts";

export interface PluginConfig {
    id: string;
    name: string;
    lang?: string;
    types?: string[];
}

export function CreateProvider(
    config: PluginConfig & Partial<ProviderApi>
): ProviderApi {
    return {
        async getHomePage() {
            throw new Error(`Provider ${config.name} has no getHomePage implemented.`);
        },
        async load() {
            throw new Error(`Provider ${config.name} has no load implemented.`);
        },
        async search() {
            throw new Error(`Provider ${config.name} has no search implemented.`);
        },
        async loadLinks() {
            throw new Error(`Provider ${config.name} has no loadLinks implemented.`);
        },
        ...config
    };
}
