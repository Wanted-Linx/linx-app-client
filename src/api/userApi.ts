import { API } from './apiUtils';

const USER_ENDPOINT = '/users';
const userApi = {
  emailLogin: async (body: { email: string; password: string; kind: string }) =>
    await API.post(`${USER_ENDPOINT}/login`, body),
};

export { userApi };
