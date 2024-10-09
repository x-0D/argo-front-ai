import { Application, Project, Repository, SyncResult } from '../types';

const API_BASE_URL = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
  }
  return response.json();
}

export const api = {
  fetchApplications: async (): Promise<Application[]> => {
    const response = await fetch(`${API_BASE_URL}/applications`);
    return handleResponse<Application[]>(response);
  },

  fetchApplication: async (name: string): Promise<Application> => {
    const response = await fetch(`${API_BASE_URL}/applications/${name}`);
    return handleResponse<Application>(response);
  },

  createApplication: async (application: Omit<Application, 'status'>): Promise<Application> => {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    });
    return handleResponse<Application>(response);
  },

  updateApplication: async (name: string, application: Partial<Application>): Promise<Application> => {
    const response = await fetch(`${API_BASE_URL}/applications/${name}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    });
    return handleResponse<Application>(response);
  },

  deleteApplication: async (name: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/applications/${name}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  syncApplication: async (name: string): Promise<SyncResult> => {
    const response = await fetch(`${API_BASE_URL}/applications/${name}/sync`, {
      method: 'POST',
    });
    return handleResponse<SyncResult>(response);
  },

  fetchProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return handleResponse<Project[]>(response);
  },

  fetchRepositories: async (): Promise<Repository[]> => {
    const response = await fetch(`${API_BASE_URL}/repositories`);
    return handleResponse<Repository[]>(response);
  },

  searchApplications: async (query: string): Promise<Application[]> => {
    const response = await fetch(`${API_BASE_URL}/applications/search?q=${encodeURIComponent(query)}`);
    return handleResponse<Application[]>(response);
  },
};