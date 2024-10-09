import React from 'react';
import { Application } from '../types';

interface ApplicationListProps {
  applications: Application[];
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {applications.map((app) => (
          <li key={app.name}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">{app.name}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {app.status}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {app.project}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    {app.namespace}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>{app.repository}</p>
                  <p className="ml-2">{app.branch}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Path: {app.path}</p>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap">
                  {app.labels.map((label, index) => (
                    <span key={index} className="px-2 py-1 mr-2 mb-2 text-xs font-medium bg-gray-100 rounded-full">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;