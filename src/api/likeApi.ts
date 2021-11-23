import type { AxiosInstance } from 'axios';

const LIKE_ENDPOINT = '/likes';
const likeApi = {
  getLike: async (authAPI: AxiosInstance, showId: number) => await authAPI.get(`${LIKE_ENDPOINT}/${showId}`),
  postLike: async (authAPI: AxiosInstance, body: { showId: number }) => await authAPI.post(`${LIKE_ENDPOINT}`, body),
  deleteLike: async (authAPI: AxiosInstance, showId: number) => await authAPI.delete(`${LIKE_ENDPOINT}/${showId}`),
};

export { likeApi };
