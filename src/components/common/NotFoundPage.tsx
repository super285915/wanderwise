import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-100 to-blue-50 p-8">
      <FaMapMarkedAlt className="text-primary-600 text-7xl mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold text-primary-700 mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">Looks like you've wandered off the map.<br />Let's get you back on your journey!</p>
      <button
        onClick={() => navigate('/')}
        className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-primary-700 transition-colors"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage; 