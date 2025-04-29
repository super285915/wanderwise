import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Globe className="text-accent-400 mr-2" size={24} />
              <h3 className="text-xl font-bold font-heading">WanderWise</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the world with confidence. Expert travel planning and booking for unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link to="/" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link to="/" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link to="/" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-heading border-b border-gray-800 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-accent-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-accent-400 transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/flights" className="text-gray-400 hover:text-accent-400 transition-colors">Flights</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-400 hover:text-accent-400 transition-colors">Hotels</Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-400 hover:text-accent-400 transition-colors">Activities</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-heading border-b border-gray-800 pb-2">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-accent-400 transition-colors">Car Rentals</Link>
              </li>
              <li>
                <Link to="/experiences" className="text-gray-400 hover:text-accent-400 transition-colors">Experiences</Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-400 hover:text-accent-400 transition-colors">Explore</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-accent-400 transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-accent-400 transition-colors">Login / Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-heading border-b border-gray-800 pb-2">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Travel Street, Cityville, Country, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-accent-400 mr-2" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-accent-400 transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-accent-400 mr-2" />
                <a href="mailto:info@wanderwise.com" className="text-gray-400 hover:text-accent-400 transition-colors">info@wanderwise.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} WanderWise. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end">
              <Link to="/" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Terms of Service</Link>
              <Link to="/" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;