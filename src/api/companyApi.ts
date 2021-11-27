import type { AxiosInstance } from 'axios';

const COMPANY_ENDPOINT = '/companies';
const companyApi = {
  getProfileImage: async (authAPI: AxiosInstance) => await authAPI.get(`${COMPANY_ENDPOINT}/profile/images`),
  getCompanyList: async (authAPI: AxiosInstance, limit: number, offset: number) =>
    await authAPI.get(`${COMPANY_ENDPOINT}?limit=${limit}&offset=${offset}`),
};

export { companyApi };
