import { http, HttpResponse, delay } from 'msw';
import { Application, Project, Repository } from '../types';

// Mock data
const mockProjects: Project[] = [
  { name: 'ecommerce', description: 'E-commerce platform' },
  { name: 'blog', description: 'Company blog' },
  { name: 'analytics', description: 'Analytics dashboard' },
];

const mockRepositories: Repository[] = [
  { url: 'https://github.com/example/frontend-app', name: 'frontend-app' },
  { url: 'https://github.com/example/backend-api', name: 'backend-api' },
  {
    url: 'https://github.com/example/analytics-service',
    name: 'analytics-service',
  },
];

const mockApplications: Application[] = [
  {
    name: 'frontend-app',
    project: 'ecommerce',
    labels: ['frontend', 'react'],
    status: 'Healthy',
    repository: 'https://github.com/example/frontend-app',
    branch: 'main',
    path: 'kubernetes',
    namespace: 'ecommerce-prod',
  },
  {
    name: 'backend-api',
    project: 'ecommerce',
    labels: ['backend', 'nodejs'],
    status: 'Degraded',
    repository: 'https://github.com/example/backend-api',
    branch: 'develop',
    path: 'k8s',
    namespace: 'ecommerce-staging',
  },
  {
    name: 'analytics-service',
    project: 'analytics',
    labels: ['backend', 'python'],
    status: 'Progressing',
    repository: 'https://github.com/example/analytics-service',
    branch: 'main',
    path: 'manifests',
    namespace: 'analytics-prod',
  },
];

// Utility functions
const simulateNetworkDelay = () => delay(Math.random() * 1000 + 500);
const simulateErrorProbability = (probability: number) =>
  Math.random() < probability;

export const handlers = [
  // Get all applications
  http.get('/api/applications', async () => {
    await simulateNetworkDelay();

    if (simulateErrorProbability(0.1)) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }

    return HttpResponse.json(mockApplications);
  }),

  // Get a single application
  http.get('/api/applications/:name', async ({ params }) => {
    await simulateNetworkDelay();

    const app = mockApplications.find((a) => a.name === params.name);

    if (!app) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }

    return HttpResponse.json(app);
  }),

  // Create a new application
  http.post('/api/applications', async ({ request }) => {
    await simulateNetworkDelay();

    if (simulateErrorProbability(0.2)) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad Request' });
    }

    const newApp = (await request.json()) as Application;
    mockApplications.push(newApp);

    return HttpResponse.json(newApp, { status: 201 });
  }),

  // Update an application
  http.put('/api/applications/:name', async ({ params, request }) => {
    await simulateNetworkDelay();

    const appIndex = mockApplications.findIndex((a) => a.name === params.name);

    if (appIndex === -1) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }

    const updatedApp = (await request.json()) as Application;
    mockApplications[appIndex] = {
      ...mockApplications[appIndex],
      ...updatedApp,
    };

    return HttpResponse.json(mockApplications[appIndex]);
  }),

  // Delete an application
  http.delete('/api/applications/:name', async ({ params }) => {
    await simulateNetworkDelay();

    const appIndex = mockApplications.findIndex((a) => a.name === params.name);

    if (appIndex === -1) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }

    mockApplications.splice(appIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  // Sync an application
  http.post('/api/applications/:name/sync', async ({ params }) => {
    await simulateNetworkDelay();

    const app = mockApplications.find((a) => a.name === params.name);

    if (!app) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }

    if (simulateErrorProbability(0.3)) {
      return new HttpResponse(null, { status: 500, statusText: 'Sync Failed' });
    }

    app.status = 'Syncing';

    return HttpResponse.json({ message: 'Sync started' });
  }),

  // Get all projects
  http.get('/api/projects', async () => {
    await simulateNetworkDelay();

    return HttpResponse.json(mockProjects);
  }),

  // Get all repositories
  http.get('/api/repositories', async () => {
    await simulateNetworkDelay();

    return HttpResponse.json(mockRepositories);
  }),

  // Search applications
  http.get('/api/applications/search', async ({ request }) => {
    await simulateNetworkDelay();

    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase();

    if (!query) {
      return HttpResponse.json(mockApplications);
    }

    const filteredApps = mockApplications.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.project.toLowerCase().includes(query) ||
        app.labels.some((label) => label.toLowerCase().includes(query))
    );

    return HttpResponse.json(filteredApps);
  }),
];
