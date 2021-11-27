import type { AxiosInstance } from 'axios';

interface ProjectBody {
  name: string;
  content: string;
  start_date: string;
  end_date: string;
  applying_start_date: string;
  applying_end_date: string;
  task_experience: string;
  qualification: string;
  sponsor_fee: number;
  task_type: string[];
}

const PROJECT_ENDPOINT = '/projects';
const projectApi = {
  getProjectList: async (authAPI: AxiosInstance, limit: number, offset: number) =>
    await authAPI.get(`${PROJECT_ENDPOINT}?limit=${limit}&offset=${offset}`),
  getProject: async (authAPI: AxiosInstance, projectId: number) =>
    await authAPI.get(`${PROJECT_ENDPOINT}/${projectId}`),
  postProject: async (authAPI: AxiosInstance, body: ProjectBody) => await authAPI.post(PROJECT_ENDPOINT, body),
};

export { projectApi };
