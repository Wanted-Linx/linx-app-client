import { API } from './apiUtils';

const AUTH_ENDPOINT = '/auth';
const loginApi = {
  emailLogin: async (body: { username: string; password: string }) => await API.post(`${AUTH_ENDPOINT}/email`, body),
  kakaoLogin: async (body: { kakaoToken: string }) => await API.post(`${AUTH_ENDPOINT}/kakao`, body),
  autoLogin: async (body: { refreshToken: string }) => await API.post(`${AUTH_ENDPOINT}/auto`, body),
};

export { loginApi };
