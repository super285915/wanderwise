import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../common/Card';
import Rating from '../common/Rating';
import { trendingDestinations } from '../../data/destinations';

const TrendingDestinations: React.FC = () => {
  const navigate = useNavigate();

  const handleDestinationClick = (id: string) => {
    navigate(`/destination/${id}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold font-heading text-gray-900">
              Trending Destinations
            </h2>
            <p className="text-gray-600 mt-2">
              Explore the most popular destinations around the world
            </p>
          </div>
          <Link
            to="/destinations"
            className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all destinations
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingDestinations.slice(0, 4).map((destination) => (
            <Card
              key={destination.id}
              elevation="medium"
              hover
              onClick={() => handleDestinationClick(destination.id)}
              className="transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                  <Rating value={destination.rating} size="sm" className="mb-1" />
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                  <p className="text-sm text-gray-200">{destination.country}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {destination.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-accent-600 font-bold text-lg">
                      ${destination.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">per person</span>
                  </div>
                  <button
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    onClick={() => handleDestinationClick(destination.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/destinations"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all destinations
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;