import { Destination } from '../types';

export const trendingDestinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    description: 'Experience the breathtaking sunsets and white-washed buildings of this iconic Greek island.',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    price: 1200,
    currency: 'USD',
    category: 'trending'
  },
  {
    id: '2',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Discover tropical paradise with stunning beaches, lush rice terraces, and vibrant culture.',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    price: 850,
    currency: 'USD',
    category: 'trending'
  },
  {
    id: '3',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Immerse yourself in the perfect blend of tradition and innovation in this dynamic metropolis.',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    price: 1500,
    currency: 'USD',
    category: 'trending'
  },
  {
    id: '4',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Enjoy the unique architecture, delicious cuisine, and vibrant street life of this Mediterranean gem.',
    image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    price: 980,
    currency: 'USD',
    category: 'trending'
  },
  {
    id: '5',
    name: 'New York City',
    country: 'USA',
    description: 'Experience the energy of the city that never sleeps with iconic landmarks and diverse neighborhoods.',
    image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    price: 1800,
    currency: 'USD',
    category: 'popular'
  },
  {
    id: '6',
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'Explore the ancient Incan citadel set high in the Andes Mountains, an archaeological wonder.',
    image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    price: 1100,
    currency: 'USD',
    category: 'recommended'
  }
];

export const popularHotels = [
  {
    id: '1',
    name: 'Luxe Ocean Resort',
    location: 'Maldives',
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 450,
    currency: 'USD',
    perNight: true,
    rating: 4.9,
    reviewCount: 487,
    amenities: ['Pool', 'Spa', 'Free Wi-Fi', 'Restaurant', 'Beach Access']
  },
  {
    id: '2',
    name: 'Urban Boutique Hotel',
    location: 'New York, USA',
    image: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 320,
    currency: 'USD',
    perNight: true,
    rating: 4.7,
    reviewCount: 325,
    amenities: ['Free Wi-Fi', 'Fitness Center', 'Breakfast', 'Bar']
  },
  {
    id: '3',
    name: 'Mountain View Lodge',
    location: 'Swiss Alps',
    image: 'https://images.pexels.com/photos/803111/pexels-photo-803111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 280,
    currency: 'USD',
    perNight: true,
    rating: 4.8,
    reviewCount: 215,
    amenities: ['Free Wi-Fi', 'Restaurant', 'Spa', 'Skiing Access']
  }
];

export const featuredFlights = [
  {
    id: '1',
    airline: 'SkyWings Airlines',
    departureTime: '08:45 AM',
    arrivalTime: '11:30 AM',
    duration: '2h 45m',
    from: 'New York (JFK)',
    to: 'Miami (MIA)',
    price: 199,
    currency: 'USD',
    stops: 0
  },
  {
    id: '2',
    airline: 'Global Airways',
    departureTime: '10:15 AM',
    arrivalTime: '04:30 PM',
    duration: '6h 15m',
    from: 'London (LHR)',
    to: 'New York (JFK)',
    price: 450,
    currency: 'USD',
    stops: 0
  },
  {
    id: '3',
    airline: 'Pacific Express',
    departureTime: '11:50 PM',
    arrivalTime: '05:25 AM',
    duration: '5h 35m',
    from: 'Los Angeles (LAX)',
    to: 'Tokyo (NRT)',
    price: 720,
    currency: 'USD',
    stops: 1
  }
];