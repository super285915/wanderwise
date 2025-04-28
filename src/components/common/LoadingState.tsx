import React from 'react';
import { FaPlane } from 'react-icons/fa';

interface LoadingStateProps {
  message?: string;
  fullscreen?: boolean;
  icon?: React.ReactNode;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...', fullscreen = false, icon }) => {
  return (
    <div className={
      fullscreen
        ? 'flex items-center justify-center w-full min-h-screen p-8 bg-white/70 rounded-lg shadow animate-fade-in'
        : 'flex items-center justify-center w-full h-full p-8 bg-white/70 rounded-lg shadow animate-fade-in'
    }>
      <div className="text-center">
        <div className="relative flex flex-col items-center mb-6">
          {/* Animated Clouds */}
          <svg className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-48 h-24 opacity-40 animate-clouds" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="30" rx="40" ry="15" fill="#c7d2fe" />
            <ellipse cx="120" cy="35" rx="30" ry="12" fill="#a5b4fc" />
            <ellipse cx="170" cy="25" rx="20" ry="8" fill="#818cf8" />
          </svg>
          {/* Airplane Icon */}
          {icon !== undefined ? icon : <FaPlane className="relative text-primary-600 text-7xl mb-2 animate-bounce-slow z-10" />}
        </div>
        <p className="text-gray-700 text-xl font-semibold tracking-wide animate-fade-in-slow">{message}</p>
      </div>
      {/* Animations (add to global CSS if not in Tailwind) */}
      {/*
      .animate-bounce-slow { animation: bounce 2s infinite; }
      .animate-fade-in-slow { animation: fadeIn 1.2s ease-in; }
      .animate-clouds { animation: cloudsMove 8s linear infinite alternate; }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes cloudsMove { 0% { transform: translateX(-10px); } 100% { transform: translateX(10px); } }
      */}
    </div>
  );
};

// Add fade-in animation via Tailwind (if not available, add to global CSS)
// .animate-fade-in { animation: fadeIn 0.5s ease-in; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

export default LoadingState; 