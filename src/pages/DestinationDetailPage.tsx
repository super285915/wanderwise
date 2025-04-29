import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { Destination } from '../types';
import { trendingDestinations } from '../data/destinations';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import Button from '../components/common/Button';
import { useNotification } from '../hooks/useNotification';

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        // For now, we'll use the static data with a simulated delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundDestination = trendingDestinations.find(d => d.id === id);
        
        if (foundDestination) {
          setDestination(foundDestination);
        } else {
          setError('Destination not found');
        }
      } catch (err) {
        setError('Failed to load destination details');
        console.error('Error fetching destination:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const handleBookNow = () => {
    if (!destination || !startDate || !endDate) {
      addNotification({
        message: 'Please select travel dates',
        type: 'warning',
        duration: 5000
      });
      return;
    }
    
    // In a real app, this would navigate to a booking page
    addNotification({
      message: `Trip to ${destination.name} booked for ${travelers} travelers!`,
      type: 'success',
      duration: 5000
    });
  };

  if (isLoading) {
    return <LoadingState message="Loading destination details..." fullscreen />;
  }

  if (error || !destination) {
    return (
      <ErrorState
        title="Destination Not Found"
        message="We couldn't find the destination you're looking for."
        showRetry={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <Link to="/destinations" className="inline-flex items-center text-white mb-6 hover:text-primary-200 transition-colors">
              <FaArrowLeft className="mr-2" />
              Back to Destinations
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <div className="flex items-center text-white mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>{destination.country}</span>
            </div>
            <div className="flex items-center text-white">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-medium mr-2">{destination.rating.toFixed(1)}</span>
              <span className="text-white/80">Excellent destination</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destination Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About {destination.name}</h2>
              <p className="text-gray-700 mb-6">
                {destination.description}
              </p>
              <p className="text-gray-700 mb-6">
                {destination.name} is a popular {destination.category} destination known for its unique culture, 
                breathtaking landscapes, and unforgettable experiences. Visitors from around the world come to 
                {destination.country} to explore its rich history and natural beauty.
              </p>
              <p className="text-gray-700">
                Whether you're looking for adventure, relaxation, or cultural immersion, {destination.name} has 
                something for every traveler. The best time to visit is during the spring and fall when the weather 
                is pleasant and the crowds are smaller.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Top Attractions</h2>
              <ul className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                      {item}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Popular Attraction {item}</h3>
                      <p className="text-gray-600">
                        A must-visit location in {destination.name} with amazing views and experiences.
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Plan Your Trip</h2>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  ${destination.price}
                  <span className="text-sm text-gray-500 font-normal ml-1">per person</span>
                </div>

                <DatePicker
                  label="Start Date"
                  selectedDate={startDate}
                  onChange={setStartDate}
                />
                
                <DatePicker
                  label="End Date"
                  selectedDate={endDate}
                  onChange={setEndDate}
                  minDate={startDate}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travelers
                  </label>
                  <Counter
                    value={travelers}
                    onChange={setTravelers}
                    min={1}
                    max={10}
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleBookNow}
                  className="mt-4"
                >
                  Book Now
                </Button>

                <div className="text-center text-sm text-gray-600 mt-4">
                  <p>Free cancellation up to 24 hours before</p>
                  <p>No payment required today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
