import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaStar, FaMapMarkerAlt, FaDollarSign, FaFilter, FaSpinner } from 'react-icons/fa';
import SearchInput from '../components/common/SearchInput';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Car, getAllCars } from '../services/dataService';

const CarsPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [rating, setRating] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [carType, setCarType] = useState<string | null>(null);
  const [transmission, setTransmission] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const data = await getAllCars();
        setCars(data);
      } catch (err) {
        setError('Failed to load cars');
        console.error('Error fetching cars:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCarClick = (carId: number) => {
    navigate(`/cars/${carId}`);
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = searchQuery
      ? car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.type.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    const matchesRating = car.rating >= rating;
    const matchesType = carType === null || car.type === carType;
    const matchesTransmission = transmission === null || car.transmission === transmission;
    return matchesSearch && matchesPrice && matchesRating && matchesType && matchesTransmission;
  });

  if (error) {
    return (
      <ErrorState
        title="Failed to load cars"
        message="Unable to load available cars. Please try again later."
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
              Find Your Perfect Ride
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Search and compare rental cars from top providers
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <SearchInput
                placeholder="Search cars, locations, or types..."
                onSearch={handleSearch}
                isLoading={isLoading}
                suggestions={[
                  'Los Angeles Airport',
                  'Las Vegas Strip',
                  'San Francisco Downtown',
                  'Sedan',
                  'SUV',
                  'Electric'
                ]}
              />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <DatePicker
                  label="Pick-up Date"
                  selectedDate={pickupDate}
                  onChange={setPickupDate}
                />
                <DatePicker
                  label="Return Date"
                  selectedDate={returnDate}
                  onChange={setReturnDate}
                  minDate={pickupDate}
                />
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
                      max="500"
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

                {/* Car Type Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Car Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Sedan', 'SUV', 'Electric', 'Luxury'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setCarType(carType === type ? null : type)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors
                          ${carType === type
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        <span>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transmission Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Transmission</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Automatic', 'Manual'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setTransmission(transmission === type ? null : type)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors
                          ${transmission === type
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

          {/* Car Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingState message="Loading available cars..." />
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCars.map(car => (
                  <div
                    key={car.id}
                    onClick={() => handleCarClick(car.id)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-1 text-white">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{car.rating}</span>
                          <span className="text-white/90">({car.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{car.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaMapMarkerAlt className="text-primary-500" />
                        <span>{car.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <FaDollarSign className="text-primary-500" />
                        <span className="font-semibold">${car.price}</span>
                        <span className="text-sm">per day</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No cars found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;