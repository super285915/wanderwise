import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaClock, FaUsers, FaCheck } from 'react-icons/fa';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import { Explore, getExploreById } from '../services/dataService';
import { useNotification } from '../hooks/useNotification';

const ExploreDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [explore, setExplore] = useState<Explore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [participants, setParticipants] = useState(1);

  useEffect(() => {
    const fetchExplore = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await getExploreById(parseInt(id));
        setExplore(data);
      } catch (err) {
        setError('Failed to load explore details');
        console.error('Error fetching explore:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExplore();
  }, [id]);

  const handleBookNow = () => {
    if (!explore) return;
    // Here you would typically handle the booking process
    // For now, we'll show a notification
    addNotification({
      message: `Booking ${explore.name} for ${participants} participants on ${selectedDate}`,
      type: 'success',
      duration: 5000
    });
  };

  if (isLoading) {
    return <LoadingState message="Exploring new destinations for you..." fullscreen />;
  }

  if (error || !explore) {
    return (
      <ErrorState
        title="Explore Not Found"
        message="We couldn't find the explore you're looking for."
        showRetry={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={explore.image}
          alt={explore.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {explore.name}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span>{explore.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{explore.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Explore Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">About the Experience</h2>
              <p className="text-gray-600 mb-6">{explore.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <FaClock className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Duration</h3>
                    <p className="text-gray-600">{explore.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <FaUsers className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Group Size</h3>
                    <p className="text-gray-600">{explore.groupSize}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What's Included</h2>
              <ul className="space-y-3">
                {explore.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-1">
                      <FaCheck className="text-green-600" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Highlights</h2>
              <ul className="space-y-3">
                {explore.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-primary-100 p-1 rounded-full mt-1">
                      <FaStar className="text-primary-600" />
                    </div>
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-gray-800">${explore.price}</span>
                  <span className="text-gray-600"> per person</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <span className="text-gray-700">{explore.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <DatePicker
                    selectedDate={selectedDate}
                    onChange={setSelectedDate}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Participants
                  </label>
                  <Counter
                    value={participants}
                    onChange={setParticipants}
                    min={1}
                    max={10}
                  />
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Book Now
                </button>

                <div className="text-center text-sm text-gray-600">
                  <p>Free cancellation up to 24 hours before</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDetailPage;