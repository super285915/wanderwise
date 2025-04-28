import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaFilter, FaClock, FaUsers } from 'react-icons/fa';
import SearchInput from '../components/common/SearchInput';
import DatePicker from '../components/common/DatePicker';
import Counter from '../components/common/Counter';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Experience, getAllExperiences } from '../services/dataService';

const ExperiencesPage = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [rating, setRating] = useState(0);
  const [experienceType, setExperienceType] = useState<string | null>(null);
  const [experienceDate, setExperienceDate] = useState('');
  const [participants, setParticipants] = useState(1);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        const data = await getAllExperiences();
        setExperiences(data);
      } catch (err) {
        setError('Failed to load experiences');
        console.error('Error fetching experiences:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleExperienceClick = (experienceId: number) => {
    navigate(`/experience/${experienceId}`);
  };

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = searchQuery
      ? experience.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesPrice = experience.price >= priceRange[0] && experience.price <= priceRange[1];
    const matchesRating = experience.rating >= rating;
    const matchesType = experienceType === null || experience.type === experienceType;
    return matchesSearch && matchesPrice && matchesRating && matchesType;
  });

  if (error) {
    return (
      <ErrorState
        title="Failed to load experiences"
        message="Unable to load available experiences. Please try again later."
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
              Unique Experiences
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Immerse yourself in local culture and create unforgettable memories
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <SearchInput
                placeholder="Search experiences, locations..."
                onSearch={handleSearch}
                isLoading={isLoading}
                suggestions={[
                  'Cultural Experiences',
                  'Food Tours',
                  'Adventure Activities',
                  'Kyoto',
                  'Florence'
                ]}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <DatePicker
                  label="Experience Date"
                  selectedDate={experienceDate}
                  onChange={setExperienceDate}
                />
                <div>
                  <div className="text-sm text-gray-500 mb-2">Participants</div>
                  <Counter
                    value={participants}
                    onChange={setParticipants}
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
                      max="200"
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

                {/* Experience Type Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Experience Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {['adventure', 'cultural', 'food', 'nature'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setExperienceType(experienceType === type ? null : type)}
                        className={`px-3 py-1 rounded-lg transition-colors
                          ${experienceType === type
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingState message="Loading available experiences..." />
              </div>
            ) : filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExperiences.map(experience => (
                  <div
                    key={experience.id}
                    onClick={() => handleExperienceClick(experience.id)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={experience.image}
                        alt={experience.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-1 text-white">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{experience.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{experience.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaMapMarkerAlt className="text-primary-500" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-primary-500" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaUsers className="text-primary-500" />
                          <span>{experience.groupSize}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <span className="font-semibold">${experience.price}</span>
                        <span className="text-sm">per person</span>
                      </div>
                      <p className="text-gray-600 text-sm">{experience.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No experiences found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesPage;