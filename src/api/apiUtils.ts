import Axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { AxiosError } from 'axios';
import Config from 'react-native-config';

export const BASE_URL = Config.BASE_URL;

const isApiError = (err: any): err is AxiosError => Axios.isAxiosError(err);
const API = Axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

const authAPI = (userId?: number): AxiosInstance =>
  Axios.create({
    baseURL: BASE_URL,
    headers: { user: userId ?? 1 },
    timeout: 1000,
  });

export { isApiError, API, authAPI };
