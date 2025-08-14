import { message as Message } from 'antd';
import { default as request } from 'axios';

export type ApiResponse<T = any> = {
    data: T;
    code: number;
    type: number;
    message: string;
};

export type PagedResponse<T = any> = {
    data: {
        data: T[];
        total: number;
        [key: string]: unknown;
    };
    code: number;
    type: number;
    message: string;
};

const axios = request.create();
axios.defaults.maxRedirects = 0;
axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
    (response) => {
        const { data, code, type, message } = response.data as ApiResponse;

        if (code !== 0) {
            if (type === 1) Message.info(message);
            if (type === 2) Message.warning(message);
            if (type === 3) Message.error(message);

            return Promise.reject({ data, code, type, message });
        }
        return response;
    },
    (error) => {
        if (error.status === 419) {
            Message.warning('请求过期，正在刷新页面');
            window.location.reload();
        }

        return Promise.reject(error);
    },
);

export default axios;
