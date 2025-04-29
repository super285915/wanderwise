import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlane, FaStar, FaMapMarkerAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Flight, getFlightById } from '../services/dataService';
import { useNotification } from '../hooks/useNotification';

const FlightDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlight = async () => {
      if (!id) {
        setError('Invalid flight ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getFlightById(Number(id));
        if (data) {
          setFlight(data);
        } else {
          setError('Flight not found');
        }
      } catch (err) {
        setError('Failed to load flight details');
        console.error('Error fetching flight:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  const handleBookNow = () => {
    if (!flight || !departureDate) {
      addNotification({
        message: 'Please select departure date',
        type: 'warning',
        duration: 5000
      });
      return;
    }
    // In a real app, this would navigate to a booking page
    console.log(`Booking flight ${id} for ${passengers} passengers on ${departureDate}`);
    addNotification({
      message: `Successfully booked flight to ${flight.to} for ${passengers} passengers`,
      type: 'success',
      duration: 5000
    });
  };

  if (isLoading) {
    return <LoadingState message="Preparing your flight adventure..." fullscreen />;
  }

  if (error || !flight) {
    return (
      <ErrorState
        title={error || 'Flight not found'}
        message={error ? 'Please try again later.' : 'The flight you\'re looking for doesn\'t exist or has been removed.'}
        actionText="Back to Flights"
        onAction={() => navigate('/flights')}
        showRetry={!!error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 py-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-gray-200 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Flights
          </button>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={flight.image}
              alt={flight.airline}
              className="w-32 h-32 object-cover rounded-lg shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{flight.airline}</h1>
              <div className="flex items-center gap-2 mb-2">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{flight.rating}</span>
                <span className="text-white/80">({flight.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt />
                <span>{flight.from} → {flight.to}</span>
              </div>
              <p className="text-white/90">{flight.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flight Details */}
          <div className="lg:col-span-2">
            {/* Flight Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Flight Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaPlane className="text-primary-500" />
                  <span>Airline: {flight.airline}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-primary-500" />
                  <span>Duration: {flight.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaPlane className="text-primary-500" />
                  <span>Stops: {flight.stops}</span>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Departure</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-primary-500" />
                    <span>{flight.from}</span>
                  </div>
                  <div className="text-gray-600 ml-6">{flight.departureTime}</div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Arrival</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-primary-500" />
                    <span>{flight.to}</span>
                  </div>
                  <div className="text-gray-600 ml-6">{flight.arrivalTime}</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flight.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="text-primary-500">•</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Flight</h2>
              <div className="space-y-4">
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
                <div className="pt-4">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    ${flight.price * passengers}
                  </div>
                  <div className="text-sm text-gray-500">Total for {passengers} passenger{passengers > 1 ? 's' : ''}</div>
                </div>
                <button
                  onClick={handleBookNow}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailPage;