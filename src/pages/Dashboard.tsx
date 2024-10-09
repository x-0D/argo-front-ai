import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import ApplicationList from '../components/ApplicationList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard: React.FC = () => {
  const { data: applications, isLoading, error } = useQuery('applications', api.fetchApplications);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load applications" />;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Deployed Applications</h2>
      <ApplicationList applications={applications || []} />
    </div>
  );
};

export default Dashboard;