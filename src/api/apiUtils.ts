import Axios from 'axios';
import type { AxiosInstance, ResponseType } from 'axios';
import type { AxiosError } from 'axios';
import Config from 'react-native-config';

export const BASE_URL = Config.BASE_URL;

const isApiError = (err: any): err is AxiosError => Axios.isAxiosError(err);
const API = Axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

const authAPI = (userId?: number, responseType?: ResponseType): AxiosInstance =>
  Axios.create({
    baseURL: BASE_URL,
    headers: { user: userId ?? 1 },
    responseType,
    timeout: 1000,
  });

export { isApiError, API, authAPI };
