import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaStar, FaMapMarkerAlt, FaClock, FaFilter, FaSpinner } from 'react-icons/fa';
import SearchInput from '../components/common/SearchInput';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Flight, getAllFlights } from '../services/dataService';

const FlightsPage = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [rating, setRating] = useState(0);
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [stops, setStops] = useState<number | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setIsLoading(true);
        const data = await getAllFlights();
        setFlights(data);
      } catch (err) {
        setError('Failed to load flights');
        console.error('Error fetching flights:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFlightClick = (flightId: number) => {
    navigate(`/flights/${flightId}`);
  };

  const filteredFlights = flights.filter(flight => {
    const matchesSearch = searchQuery
      ? flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.to.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesPrice = flight.price >= priceRange[0] && flight.price <= priceRange[1];
    const matchesRating = flight.rating >= rating;
    const matchesStops = stops === null || flight.stops === stops;
    return matchesSearch && matchesPrice && matchesRating && matchesStops;
  });

  if (error) {
    return (
      <ErrorState
        title="Failed to load flights"
        message="Unable to load available flights. Please try again later."
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
              Find Your Perfect Flight
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Search and compare flights from top airlines
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <SearchInput
                placeholder="Search airlines, destinations..."
                onSearch={handleSearch}
                isLoading={isLoading}
                suggestions={[
                  'Emirates',
                  'Singapore Airlines',
                  'New York',
                  'London',
                  'Tokyo',
                  'Dubai'
                ]}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <DatePicker
                  label="Departure Date"
                  selectedDate={departureDate}
                  onChange={setDepartureDate}
                />
                <div>
                  <div className="text-sm text-gray-500 mb-2">Passengers</div>
                  <Counter
                    value={passengers}
                    onChange={setPassengers}
                    min={1}
                    max={9}
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
                      max="2000"
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

                {/* Stops Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Stops</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Non-stop', '1 Stop', '2+ Stops'].map((stop, index) => (
                      <button
                        key={stop}
                        onClick={() => setStops(index === 0 ? 0 : index === 1 ? 1 : 2)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors
                          ${stops === (index === 0 ? 0 : index === 1 ? 1 : 2)
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        <span>{stop}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingState message="Loading available flights..." />
              </div>
            ) : filteredFlights.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFlights.map(flight => (
                  <div
                    key={flight.id}
                    onClick={() => handleFlightClick(flight.id)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={flight.image}
                        alt={flight.airline}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-1 text-white">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{flight.rating}</span>
                          <span className="text-white/90">({flight.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{flight.airline}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaMapMarkerAlt className="text-primary-500" />
                        <span>{flight.from} → {flight.to}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaClock className="text-primary-500" />
                        <span>{flight.duration}</span>
                        <span className="text-sm text-gray-500">
                          ({flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <span className="font-semibold">${flight.price}</span>
                        <span className="text-sm">per passenger</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No flights found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;