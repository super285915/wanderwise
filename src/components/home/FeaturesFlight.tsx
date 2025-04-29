import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, ArrowRight, Plane } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { featuredFlights } from '../../data/destinations';

const FeaturedFlights: React.FC = () => {
  const navigate = useNavigate();

  const handleFlightClick = (id: string) => {
    // Convert string ID from featuredFlights to numeric ID for flights in dataService
    // The mapping is: '1' -> 1, '2' -> 2, '3' -> 3
    const numericId = parseInt(id);
    navigate(`/flights/${numericId}`);
  };

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold font-heading text-gray-900">
              Featured Flights
            </h2>
            <p className="text-gray-600 mt-2">
              Top flight deals with comfort and convenience
            </p>
          </div>
          <Link
            to="/flights"
            className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all flights
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredFlights.map((flight) => (
            <Card
              key={flight.id}
              elevation="medium"
              hover
              onClick={() => handleFlightClick(flight.id)}
              className="transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Plane className="text-primary-500 mr-2" size={20} />
                    <span className="font-medium">{flight.airline}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold">{flight.departureTime}</div>
                    <div className="text-sm text-gray-600">{flight.from}</div>
                  </div>

                  <div className="flex-1 mx-4 flex flex-col items-center">
                    <div className="w-full flex items-center">
                      <div className="h-0.5 flex-1 bg-gray-300"></div>
                      <Plane className="mx-2 text-gray-400 transform rotate-90" size={16} />
                      <div className="h-0.5 flex-1 bg-gray-300"></div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock size={12} className="mr-1" />
                      {flight.duration}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-bold">{flight.arrivalTime}</div>
                    <div className="text-sm text-gray-600">{flight.to}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-accent-600 font-bold text-lg">
                      ${flight.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">round trip</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFlightClick(flight.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/flights"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all flights
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFlights;