import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Settings, User, BookOpen } from 'lucide-react';

const SideMenu: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Layout, label: 'Applications' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/user-info', icon: User, label: 'User Info' },
    { path: '/wiki', icon: BookOpen, label: 'Wiki' },
  ];

  return (
    <nav className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-2xl font-semibold">ArgoCD</h2>
      </div>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center space-x-2 py-2 px-4 rounded transition duration-200 ${
            location.pathname === item.path
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default SideMenu;