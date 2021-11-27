import type { AxiosInstance } from 'axios';

const PROJECT_ENDPOINT = '/projects';
const projectApi = {
  getProjectList: async (authAPI: AxiosInstance, limit: number, offset: number) =>
    await authAPI.get(`${PROJECT_ENDPOINT}?limit=${limit}&offset=${offset}`),
  getProject: async (authAPI: AxiosInstance, projectId: number) =>
    await authAPI.get(`${PROJECT_ENDPOINT}/${projectId}`),
};

export { projectApi };
