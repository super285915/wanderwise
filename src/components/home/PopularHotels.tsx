import React from 'react';
import { ArrowRight, Star, Wifi, Coffee, Utensils, Waves, Space as Spa } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import { popularHotels } from '../../data/destinations';

const amenityIcons: Record<string, React.ReactNode> = {
  'Pool': <Waves size={14} />,
  'Spa': <Spa size={14} />,
  'Free Wi-Fi': <Wifi size={14} />,
  'Restaurant': <Utensils size={14} />,
  'Breakfast': <Coffee size={14} />,
  'Bar': <Coffee size={14} />,
};

const PopularHotels: React.FC = () => {
  const navigate = useNavigate();

  const handleHotelClick = (id: string) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold font-heading text-gray-900">
              Popular Hotels
            </h2>
            <p className="text-gray-600 mt-2">
              Discover top-rated hotels with exceptional amenities
            </p>
          </div>
          <a
            href="/hotels"
            className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all hotels
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {popularHotels.map((hotel) => (
            <Card
              key={hotel.id}
              elevation="medium"
              hover
              onClick={() => handleHotelClick(hotel.id)}
              className="transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
                  <Star className="text-accent-500 fill-accent-500 w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{hotel.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{hotel.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{hotel.location}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
                    >
                      {amenityIcons[amenity]}
                      <span className="ml-1">{amenity}</span>
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-accent-600 font-bold text-lg">
                      ${hotel.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      {hotel.perNight ? '/night' : ''}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {hotel.reviewCount} reviews
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="/hotels"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all hotels
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularHotels;