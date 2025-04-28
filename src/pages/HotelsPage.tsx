import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHotel, FaStar, FaMapMarkerAlt, FaBed, FaFilter } from 'react-icons/fa';
import SearchInput from '../components/common/SearchInput';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Hotel, getAllHotels } from '../services/dataService';

const HotelsPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const data = await getAllHotels();
        setHotels(data);
      } catch (err) {
        setError('Failed to load hotels');
        console.error('Error fetching hotels:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleHotelClick = (hotelId: number) => {
    navigate(`/hotels/${hotelId}`);
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = searchQuery
      ? hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const matchesRating = hotel.rating >= rating;
    const matchesRoomType = roomType === null || hotel.roomTypes.some(room => room.name === roomType);
    return matchesSearch && matchesPrice && matchesRating && matchesRoomType;
  });

  if (error) {
    return (
      <ErrorState
        title="Failed to load hotels"
        message="Unable to load available hotels. Please try again later."
        showRetry={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Discover and book hotels from around the world
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <SearchInput
                placeholder="Search hotels, locations..."
                onSearch={handleSearch}
                isLoading={isLoading}
                suggestions={[
                  'Marriott',
                  'Hilton',
                  'New York',
                  'Paris',
                  'Tokyo',
                  'Dubai'
                ]}
              />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <DatePicker
                  label="Check-in Date"
                  selectedDate={checkInDate}
                  onChange={setCheckInDate}
                />
                <DatePicker
                  label="Check-out Date"
                  selectedDate={checkOutDate}
                  onChange={setCheckOutDate}
                  minDate={checkInDate}
                />
                <div>
                  <div className="text-sm text-gray-500 mb-2">Guests</div>
                  <Counter
                    value={guests}
                    onChange={setGuests}
                    min={1}
                    max={10}
                  />
                </div>
              </div>
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

                {/* Room Type Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Room Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Deluxe Ocean View', 'Beach Villa', 'Suite', 'Executive'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setRoomType(roomType === type ? null : type)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors
                          ${roomType === type
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        <span>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingState message="Loading available hotels..." />
              </div>
            ) : filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHotels.map(hotel => (
                  <div
                    key={hotel.id}
                    onClick={() => handleHotelClick(hotel.id)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-1 text-white">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{hotel.rating}</span>
                          <span className="text-white/90">({hotel.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{hotel.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaMapMarkerAlt className="text-primary-500" />
                        <span>{hotel.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaBed className="text-primary-500" />
                        <span>{hotel.roomTypes.map(room => room.name).join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <span className="font-semibold">${hotel.price}</span>
                        <span className="text-sm">per night</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;