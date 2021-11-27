import type { AxiosInstance } from 'axios';

const CLUB_ENDPOINT = '/clubs';
const clubApi = {
  getProfileImage: async (authAPI: AxiosInstance) => await authAPI.get(`${CLUB_ENDPOINT}/profile/images`),
  getClubList: async (authAPI: AxiosInstance, limit: number, offset: number) =>
    await authAPI.get(`${CLUB_ENDPOINT}?limit=${limit}&offset=${offset}`),
};

export { clubApi };
