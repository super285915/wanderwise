import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHotel, FaStar, FaMapMarkerAlt, FaBed, FaSwimmingPool, FaWifi, FaParking, FaUtensils, FaSpa, FaArrowLeft } from 'react-icons/fa';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Hotel, getHotelById } from '../services/dataService';
import { useNotification } from '../hooks/useNotification';

const HotelDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(0);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) {
        setError('Invalid hotel ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getHotelById(Number(id));
        if (data) {
          setHotel(data);
        } else {
          setError('Hotel not found');
        }
      } catch (err) {
        setError('Failed to load hotel details');
        console.error('Error fetching hotel:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleBookNow = () => {
    if (!hotel || !checkInDate || !checkOutDate) {
      addNotification({
        message: 'Please select check-in and check-out dates',
        type: 'warning',
        duration: 5000
      });
      return;
    }
    // In a real app, this would navigate to a booking page
    console.log(`Booking hotel ${id} for ${guests} guests from ${checkInDate} to ${checkOutDate}`);
    addNotification({
      message: `Successfully booked ${hotel.name} for ${guests} guests`,
      type: 'success',
      duration: 5000
    });
  };

  if (isLoading) {
    return <LoadingState message="Finding the best stays for your journey..." fullscreen />;
  }

  if (error || !hotel) {
    return (
      <ErrorState
        title={error || 'Hotel not found'}
        message={error ? 'Please try again later.' : 'The hotel you\'re looking for doesn\'t exist or has been removed.'}
        actionText="Back to Hotels"
        onAction={() => navigate('/hotels')}
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
            Back to Hotels
          </button>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-32 h-32 object-cover rounded-lg shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{hotel.rating}</span>
                <span className="text-white/80">({hotel.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt />
                <span>{hotel.location}</span>
              </div>
              <p className="text-white/90">{hotel.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Details */}
          <div className="lg:col-span-2">
            {/* Room Types */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Room Types</h2>
              <div className="space-y-4">
                {hotel.roomTypes.map((room, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      selectedRoom === index
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    } cursor-pointer`}
                    onClick={() => setSelectedRoom(index)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <FaBed className="text-primary-500" />
                          <span>Sleeps {room.capacity}</span>
                        </div>
                        <div className="mt-2">
                          {room.features.map((feature, i) => (
                            <span
                              key={i}
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm mr-2 mb-2"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary-600">${room.price}</div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => {
                  let icon;
                  switch (amenity.toLowerCase()) {
                    case 'pool':
                      icon = <FaSwimmingPool className="text-primary-500" />;
                      break;
                    case 'wifi':
                      icon = <FaWifi className="text-primary-500" />;
                      break;
                    case 'parking':
                      icon = <FaParking className="text-primary-500" />;
                      break;
                    case 'restaurant':
                      icon = <FaUtensils className="text-primary-500" />;
                      break;
                    case 'spa':
                      icon = <FaSpa className="text-primary-500" />;
                      break;
                    default:
                      icon = <FaHotel className="text-primary-500" />;
                  }
                  return (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      {icon}
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Stay</h2>
              <div className="space-y-4">
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
                    max={hotel.roomTypes[selectedRoom].capacity}
                  />
                </div>
                <div className="pt-4">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    ${hotel.roomTypes[selectedRoom].price * guests}
                  </div>
                  <div className="text-sm text-gray-500">Total for {guests} guest{guests > 1 ? 's' : ''}</div>
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

export default HotelDetailPage;