import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCar, FaStar, FaMapMarkerAlt, FaGasPump, FaCog, FaSnowflake, FaWifi, FaMusic, FaArrowLeft } from 'react-icons/fa';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Car, getCarById } from '../services/dataService';
import { useNotification } from '../hooks/useNotification';

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [car, setCar] = useState<Car | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) {
        setError('Invalid car ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getCarById(Number(id));
        if (data) {
          setCar(data);
        } else {
          setError('Car not found');
        }
      } catch (err) {
        setError('Failed to load car details');
        console.error('Error fetching car:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleBookNow = () => {
    if (!car || !pickupDate || !returnDate) {
      addNotification({
        message: 'Please select pickup and return dates',
        type: 'warning',
        duration: 5000
      });
      return;
    }
    // In a real app, this would navigate to a booking page
    console.log(`Booking car ${id} for ${days} days from ${pickupDate} to ${returnDate}`);
    addNotification({
      message: `Successfully booked ${car.name} for ${days} days`,
      type: 'success',
      duration: 5000
    });
  };

  if (isLoading) {
    return <LoadingState message="Getting your ride ready for the road trip..." fullscreen />;
  }

  if (error || !car) {
    return (
      <ErrorState
        title={error || 'Car not found'}
        message={error ? 'Please try again later.' : 'The car you\'re looking for doesn\'t exist or has been removed.'}
        actionText="Back to Cars"
        onAction={() => navigate('/cars')}
        showRetry={!!error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-gray-200 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Cars
          </button>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={car.image}
              alt={car.name}
              className="w-32 h-32 object-cover rounded-lg shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{car.rating}</span>
                <span className="text-white/80">({car.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt />
                <span>{car.location}</span>
              </div>
              <p className="text-white/90">{car.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Details */}
          <div className="lg:col-span-2">
            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCog className="text-primary-500" />
                  <span>Transmission: {car.transmission}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCar className="text-primary-500" />
                  <span>Seats: {car.seats}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCar className="text-primary-500" />
                  <span>Type: {car.type}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    {feature === 'Bluetooth' && <FaMusic className="text-primary-500" />}
                    {feature === 'GPS Navigation' && <FaWifi className="text-primary-500" />}
                    {feature === 'Heated Seats' && <FaSnowflake className="text-primary-500" />}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Car</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <div className="text-sm text-gray-500 mb-2">Rental Days</div>
                  <Counter
                    value={days}
                    onChange={setDays}
                    min={1}
                    max={30}
                  />
                </div>
                <div className="pt-4">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    ${car.price * days}
                  </div>
                  <div className="text-sm text-gray-500">Total for {days} day{days > 1 ? 's' : ''}</div>
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

export default CarDetailPage;