import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Home, Car, Globe } from 'lucide-react';
import Button from '../common/Button';
import SearchInput from '../common/SearchInput';
import DatePicker from '../common/DatePicker';
import Counter from '../common/Counter';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cars' | 'experiences'>('hotels');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    navigate(`/${activeTab}?destination=${encodeURIComponent(destination)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  const topDestinations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'Bali, Indonesia',
    'Barcelona, Spain',
    'Rome, Italy',
    'London, UK',
    'Dubai, UAE',
    'Sydney, Australia',
    'Cancun, Mexico'
  ];

  return (
    <div className="relative bg-primary-900 text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-32 md:py-40">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 animate-fade-in">
            Discover the World <span className="text-accent-400">Your Way</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-slide-up">
            Find and book the perfect destination with personalized recommendations and exclusive deals.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 text-gray-800 animate-fade-in">
            {/* Tabs */}
            <div className="flex flex-wrap mb-6 border-b border-gray-200">
              <button
                className={`flex items-center pb-3 px-4 mr-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'flights'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('flights')}
              >
                <Plane size={16} className="mr-2" />
                Flights
              </button>
              <button
                className={`flex items-center pb-3 px-4 mr-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'hotels'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('hotels')}
              >
                <Home size={16} className="mr-2" />
                Hotels
              </button>
              <button
                className={`flex items-center pb-3 px-4 mr-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'cars'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('cars')}
              >
                <Car size={16} className="mr-2" />
                Cars
              </button>
              <button
                className={`flex items-center pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'experiences'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('experiences')}
              >
                <Globe size={16} className="mr-2" />
                Experiences
              </button>
            </div>

            {/* Search Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Where do you want to go?
                  </label>
                  <SearchInput
                    placeholder={`Search ${activeTab === 'flights' ? 'destinations' : 'locations'}...`}
                    onSearch={setDestination}
                    suggestions={topDestinations}
                  />
                </div>
                <div>
                  <DatePicker
                    label={activeTab === 'cars' ? 'Pick-up date' : 'Check-in date'}
                    selectedDate={checkIn}
                    onChange={setCheckIn}
                  />
                </div>
                <div>
                  <DatePicker
                    label={activeTab === 'cars' ? 'Drop-off date' : 'Check-out date'}
                    selectedDate={checkOut}
                    onChange={setCheckOut}
                    minDate={checkIn}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-end justify-between">
                <Counter
                  label={activeTab === 'flights' || activeTab === 'hotels' ? 'Guests' : activeTab === 'cars' ? 'Passengers' : 'People'}
                  value={guests}
                  onChange={setGuests}
                  min={1}
                  max={10}
                  className="mb-4 md:mb-0"
                />
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSearch}
                  className="w-full md:w-auto"
                >
                  Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;