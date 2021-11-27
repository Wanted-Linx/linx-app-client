import type { AxiosInstance } from 'axios';

const STUDENT_ENDPOINT = '/students';
const studentApi = {
  getProfileImage: async (authAPI: AxiosInstance) => await authAPI.get(`${STUDENT_ENDPOINT}/profile/images`),
  getStudent: async (authAPI: AxiosInstance, userId: number) =>
    await authAPI.get(`${STUDENT_ENDPOINT}?owner=${userId}`),
};

export { studentApi };
