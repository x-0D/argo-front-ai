import React from 'react';
import { Plus, RefreshCw, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">ArgoCD Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New App
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Apps
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;