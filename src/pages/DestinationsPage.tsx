import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaFilter, FaGlobeAmericas } from 'react-icons/fa';
import SearchInput from '../components/common/SearchInput';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Destination } from '../types';
import { trendingDestinations } from '../data/destinations';

const DestinationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch destinations data
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        // For now, we'll use the static data with a simulated delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setDestinations(trendingDestinations);
      } catch (err) {
        setError('Failed to load destinations');
        console.error('Error fetching destinations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDestinationClick = (destinationId: string) => {
    navigate(`/destination/${destinationId}`);
  };

  // Filter destinations based on search query, price range, rating, and category
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = searchQuery
      ? destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];
    const matchesRating = destination.rating >= rating;
    const matchesCategory = selectedCategory ? destination.category === selectedCategory : true;
    return matchesSearch && matchesPrice && matchesRating && matchesCategory;
  });

  // Get unique countries for filtering
  const countries = [...new Set(destinations.map(destination => destination.country))];

  if (error) {
    return (
      <ErrorState
        title="Failed to load destinations"
        message="Unable to load available destinations. Please try again later."
        showRetry={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Amazing Destinations
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Explore the world's most beautiful places and plan your next adventure
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <SearchInput
                placeholder="Search destinations, countries..."
                onSearch={handleSearch}
                isLoading={isLoading}
                suggestions={countries}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200"
            >
              <FaFilter className="text-primary-600" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/4`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">${priceRange[0]}</span>
                  <span className="text-sm text-gray-600">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1 rounded-full ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <FaStar size={20} />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === null ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    All Categories
                  </button>
                  {['trending', 'popular', 'recommended'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md capitalize ${
                        selectedCategory === category ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Reset Filters */}
              <button
                onClick={() => {
                  setPriceRange([0, 2000]);
                  setRating(0);
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="w-full py-2 text-sm text-primary-600 hover:text-primary-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingState message="Loading destinations..." />
              </div>
            ) : filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map(destination => (
                  <div
                    key={destination.id}
                    onClick={() => handleDestinationClick(destination.id)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                  >
                    <div className="relative">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-primary-600 capitalize">
                        {destination.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{destination.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaMapMarkerAlt className="mr-1 text-primary-500" />
                        <span className="text-sm">{destination.country}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-primary-600 font-bold">
                          ${destination.price}
                          <span className="text-xs text-gray-500 font-normal ml-1">avg/person</span>
                        </div>
                        <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaGlobeAmericas className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No destinations found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
