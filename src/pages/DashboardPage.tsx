import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Calendar, CreditCard, Heart, Settings, Clock, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNotification } from '../hooks/useNotification';
import Button from '../components/common/Button';

const DashboardPage: React.FC = () => {
  const { user, logout } = useUser();
  const { addNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">You are not logged in</h1>
          <p className="text-gray-600 mb-8">Please log in to view your dashboard</p>
          <Link to="/login">
            <Button variant="primary" size="lg">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    addNotification({
      message: 'You have been successfully logged out',
      type: 'success',
      duration: 5000
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Add your phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Add your location"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
              <textarea
                placeholder="Tell us about yourself and your travel preferences..."
                className="w-full p-3 border border-gray-300 rounded-lg h-32"
              ></textarea>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                variant="primary"
                onClick={() => addNotification({
                  message: 'Profile updated successfully!',
                  type: 'success',
                  duration: 5000
                })}
              >
                Save Changes
              </Button>
            </div>
          </div>
        );
      case 'trips':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Trips</h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Paris Getaway</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Calendar size={16} className="mr-1" />
                      <span>May 15 - May 22, 2023</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Upcoming
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
                    Flight
                  </span>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
                    Hotel
                  </span>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
                    Activities
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Tokyo Adventure</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Calendar size={16} className="mr-1" />
                      <span>March 10 - March 20, 2023</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
                    Flight
                  </span>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
                    Hotel
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <CreditCard size={16} className="text-blue-600" />
                        </div>
                        <span>Hotel</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Grand Plaza Hotel</div>
                      <div className="text-sm text-gray-500">New York City</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      May 15 - May 22, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <CreditCard size={16} className="text-purple-600" />
                        </div>
                        <span>Flight</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">New York to Paris</div>
                      <div className="text-sm text-gray-500">Emirates Airlines</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      May 15, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500"
                    alt="Paris"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full text-red-500">
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">Paris, France</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <span>Europe</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" fullWidth>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=500"
                    alt="London"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full text-red-500">
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">London, UK</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <span>Europe</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" fullWidth>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700">Booking confirmations</p>
                      <p className="text-sm text-gray-500">Receive emails when your bookings are confirmed</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700">Special offers</p>
                      <p className="text-sm text-gray-500">Receive emails about special deals and promotions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700">Travel tips</p>
                      <p className="text-sm text-gray-500">Receive emails with travel tips and recommendations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Account</h3>
                <p className="text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="danger">Delete Account</Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-100 mb-4">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <User size={32} />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-500 text-sm mt-1">Member since {new Date().getFullYear()}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'profile' ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : 'text-gray-700'
                  }`}
                >
                  <User size={18} className="mr-3" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('trips')}
                  className={`flex items-center px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'trips' ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : 'text-gray-700'
                  }`}
                >
                  <MapPin size={18} className="mr-3" />
                  <span>My Trips</span>
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'bookings' ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : 'text-gray-700'
                  }`}
                >
                  <Clock size={18} className="mr-3" />
                  <span>Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex items-center px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'favorites' ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : 'text-gray-700'
                  }`}
                >
                  <Heart size={18} className="mr-3" />
                  <span>Favorites</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'settings' ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : 'text-gray-700'
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
