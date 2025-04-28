import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, LogOut, Globe, Map, Plane, Home, Car } from 'lucide-react';
import Button from '../common/Button';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useUser();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Flights', icon: <Plane size={16} />, path: '/flights' },
    { label: 'Hotels', icon: <Home size={16} />, path: '/hotels' },
    { label: 'Cars', icon: <Car size={16} />, path: '/cars' },
    { label: 'Experiences', icon: <Globe size={16} />, path: '/experiences' },
    { label: 'Explore', icon: <Map size={16} />, path: '/explore' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <Globe
              size={28}
              className={`mr-2 ${
                isScrolled || !isHomePage ? 'text-primary-600' : 'text-white'
              }`}
            />
            <span
              className={`text-xl font-bold font-heading ${
                isScrolled || !isHomePage ? 'text-primary-900' : 'text-white'
              }`}
            >
              WanderWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center text-sm font-medium transition-colors duration-200 ${
                  isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-primary-600'
                    : 'text-white hover:text-accent-300'
                } ${location.pathname === item.path ? 'text-primary-600 font-semibold' : ''}`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center">
                <Link to="/dashboard" className="flex items-center mr-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-accent-400">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-600">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant={isScrolled || !isHomePage ? 'outline' : 'primary'}
                    size="sm"
                    className={`flex items-center transition-colors duration-200 ${
                      isScrolled || !isHomePage
                        ? 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                        : ''
                    }`}
                  >
                    <LogIn size={16} className="mr-1" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center"
                  >
                    <User size={16} className="mr-1" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fade-in">
            <nav className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center py-2 text-gray-700 hover:text-primary-600 ${
                    location.pathname === item.path ? 'text-primary-600 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center py-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-2" />
                      My Account
                    </Link>
                    <button
                      className="flex items-center py-2 text-gray-700 hover:text-primary-600 w-full text-left"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center py-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn size={18} className="mr-2" />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center py-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-2" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;