import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-accent-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-accent-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-accent-400 transition-colors">Travel Blog</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-accent-400 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-accent-400 transition-colors">Support Center</Link>
              </li>
            </ul>
          </div>

          {/* Travel Types */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-heading">Travel Types</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/luxury" className="text-gray-400 hover:text-accent-400 transition-colors">Luxury Travel</Link>
              </li>
              <li>
                <Link to="/adventure" className="text-gray-400 hover:text-accent-400 transition-colors">Adventure Travel</Link>
              </li>
              <li>
                <Link to="/family" className="text-gray-400 hover:text-accent-400 transition-colors">Family Vacations</Link>
              </li>
              <li>
                <Link to="/honeymoon" className="text-gray-400 hover:text-accent-400 transition-colors">Honeymoon Packages</Link>
              </li>
              <li>
                <Link to="/business" className="text-gray-400 hover:text-accent-400 transition-colors">Business Travel</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-heading">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Travel Street, Cityville, Country, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-accent-400 mr-2" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-accent-400 mr-2" />
                <span className="text-gray-400">info@wanderwise.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} WanderWise. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;