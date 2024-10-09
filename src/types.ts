export interface Application {
  name: string;
  project: string;
  labels: string[];
  status: string;
  repository: string;
  branch: string;
  path: string;
  namespace: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Repository {
  url: string;
  name: string;
}

export interface SyncResult {
  message: string;
}