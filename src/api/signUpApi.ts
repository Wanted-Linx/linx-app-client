import { API } from './apiUtils';

const SIGN_UP_ENDPOINT = '/signup';
const signUpApi = {
  checkEmailDuplicate: async (body: { username: string }) => await API.post(`${SIGN_UP_ENDPOINT}/duplicate/email`, body),
  checkNicknameDuplicate: async (body: { nickname: string }) => await API.post(`${SIGN_UP_ENDPOINT}/duplicate/nickname`, body),
  emailSignUp: async (body: { username: string; password: string; nickname: string }) => await API.post(`${SIGN_UP_ENDPOINT}/email`, body),
  kakaoSignUp: async (body: { username: string; nickname: string }) => await API.post(`${SIGN_UP_ENDPOINT}/kakao`, body),
};

export { signUpApi };
