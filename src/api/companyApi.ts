import type { AxiosInstance } from 'axios';

const COMPANY_ENDPOINT = '/companies';
const companyApi = {
  getProfileImage: async (authAPI: AxiosInstance) => await authAPI.get(`${COMPANY_ENDPOINT}/profile/images`),
};

export { companyApi };
