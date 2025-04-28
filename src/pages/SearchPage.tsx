import React, { useState, useEffect } from 'react';
import { FaHotel, FaPlane, FaCar, FaWalking, FaFilter, FaStar, FaMapMarkerAlt, FaDollarSign, FaSearch, FaSpinner } from 'react-icons/fa';
import SearchInput from '../components/common/SearchInput';

type SearchCategory = 'hotels' | 'flights' | 'cars' | 'experiences';

interface SearchResult {
  id: number;
  type: SearchCategory;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  details: string;
}

const SearchPage = () => {
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('hotels');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'reviews'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Sample search results - in a real app, this would come from an API
  const searchResults: SearchResult[] = [
    {
      id: 1,
      type: 'hotels',
      title: 'Luxury Resort & Spa',
      location: 'Maldives',
      price: 450,
      rating: 4.8,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
      details: 'Beachfront resort with private pools and stunning ocean views'
    },
    {
      id: 2,
      type: 'flights',
      title: 'New York to London',
      location: 'JFK → LHR',
      price: 650,
      rating: 4.5,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500',
      details: 'Direct flight, 7h 20m, Business Class Available'
    },
    {
      id: 3,
      type: 'cars',
      title: 'Tesla Model 3',
      location: 'Los Angeles',
      price: 80,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500',
      details: 'Electric vehicle, Autopilot, Free Supercharging'
    },
    {
      id: 4,
      type: 'experiences',
      title: 'Wine Tasting Tour',
      location: 'Tuscany, Italy',
      price: 120,
      rating: 4.7,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=500',
      details: 'Visit 3 wineries with expert guides and tastings'
    },
  ];

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const filteredResults = searchResults
    .filter(result => {
      const matchesCategory = activeCategory === result.type;
      const matchesPrice = result.price >= priceRange[0] && result.price <= priceRange[1];
      const matchesRating = result.rating >= rating;
      const matchesSearch = searchQuery
        ? result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.details.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'rating') {
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      } else {
        return sortOrder === 'asc' ? a.reviews - b.reviews : b.reviews - a.reviews;
      }
    });

  const categories = [
    { id: 'hotels', label: 'Hotels', icon: FaHotel },
    { id: 'flights', label: 'Flights', icon: FaPlane },
    { id: 'cars', label: 'Cars', icon: FaCar },
    { id: 'experiences', label: 'Experiences', icon: FaWalking },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Travel Experience
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Search across hotels, flights, cars, and unique experiences
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-wrap gap-4 mb-6">
                {categories.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveCategory(id as SearchCategory)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
                      ${activeCategory === id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    <Icon className={activeCategory === id ? 'text-white' : 'text-gray-600'} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <SearchInput
                placeholder="Search destinations, properties, or activities..."
                onSearch={handleSearch}
                isLoading={isLoading}
                suggestions={[
                  'Paris, France',
                  'Tokyo, Japan',
                  'New York, USA',
                  'Bali, Indonesia',
                  'Barcelona, Spain'
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-600 hover:text-gray-900"
                >
                  <FaFilter />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Sort Options */}
                <div>
                  <h3 className="font-medium mb-3 text-gray-700">Sort By</h3>
                  <div className="space-y-2">
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'reviews')}
                    >
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                      <option value="reviews">Reviews</option>
                    </select>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Rating</h3>
                  <div className="flex flex-wrap gap-2">
                    {[4, 3, 2, 1].map((stars) => (
                      <button
                        key={stars}
                        onClick={() => setRating(stars)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors
                          ${rating === stars
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        <FaStar className={rating === stars ? 'text-yellow-300' : 'text-gray-400'} />
                        <span>{stars}+</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <FaSpinner className="w-8 h-8 text-primary-600 animate-spin" />
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResults.map(result => (
                  <div key={result.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="relative">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-1 text-white">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{result.rating}</span>
                          <span className="text-white/90">({result.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{result.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaMapMarkerAlt className="text-primary-500" />
                        <span>{result.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <FaDollarSign className="text-primary-500" />
                        <span className="font-semibold">${result.price}</span>
                        <span className="text-sm">per night</span>
                      </div>
                      <p className="text-gray-600 text-sm">{result.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;