import { useRequest } from 'ahooks';
import axios from 'axios';

export type Config = {
    app_name?: string;
    app_icon?: string;
};

export function useConfig() {
    async function fetchConfig(): Promise<Config> {
        return (await axios.get('/config/config.json')).data;
    }

    const { data: config, loading } = useRequest(fetchConfig, {
        cacheKey: 'config',
    });

    return { config, loading };
}
