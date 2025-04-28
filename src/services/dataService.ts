// Types
export interface Car {
  id: number;
  name: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  transmission: string;
  seats: number;
}

export interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  stops: number;
  description: string;
  amenities: string[];
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  amenities: string[];
  roomTypes: {
    name: string;
    price: number;
    capacity: number;
    features: string[];
  }[];
}

export interface Activity {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

export interface Explore {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  duration: string;
  groupSize: string;
  included: string[];
  highlights: string[];
}

export interface Experience {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  duration: string;
  groupSize: string;
  included: string[];
  highlights: string[];
  type: 'adventure' | 'cultural' | 'food' | 'nature';
}

// Sample data - in a real app, this would be fetched from an API
const cars: Car[] = [
  {
    id: 1,
    name: 'Toyota Camry',
    type: 'Sedan',
    location: 'Los Angeles Airport',
    price: 45,
    rating: 4.7,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500',
    features: ['Bluetooth', 'GPS', 'Backup Camera', 'Cruise Control'],
    transmission: 'Automatic',
    seats: 5,
    description: 'Experience comfort and reliability with our Toyota Camry. Perfect for business or leisure travel.'
  },
  // ... other cars
];

const flights: Flight[] = [
  {
    id: 1,
    airline: 'Emirates',
    from: 'New York (JFK)',
    to: 'London (LHR)',
    departureTime: '09:00 AM',
    arrivalTime: '10:20 PM',
    duration: '7h 20m',
    price: 850,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500',
    stops: 0,
    description: 'Enjoy premium service and comfort on our direct flight from New York to London.',
    amenities: ['Wi-Fi', 'Entertainment System', 'Premium Meals', 'Extra Legroom']
  },
  // ... other flights
];

const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Luxury Resort & Spa',
    location: 'Maldives',
    price: 450,
    rating: 4.8,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
    description: 'Experience ultimate luxury in our beachfront resort with world-class amenities.',
    amenities: ['Pool', 'Spa', 'Restaurant', 'Beach Access'],
    roomTypes: [
      {
        name: 'Deluxe Ocean View',
        price: 450,
        capacity: 2,
        features: ['Ocean View', 'King Bed', 'Private Balcony']
      },
      {
        name: 'Beach Villa',
        price: 850,
        capacity: 4,
        features: ['Private Pool', 'Direct Beach Access', 'Kitchen']
      }
    ]
  },
  // ... other hotels
];

const activities: Activity[] = [
  {
    id: 1,
    name: 'City Tour',
    location: 'New York',
    price: 50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500',
    description: 'Explore the city with our expert guides'
  },
  // ... other activities
];

const explores: Explore[] = [
  {
    id: 1,
    name: 'Hidden Gems of Paris',
    location: 'Paris, France',
    price: 75,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500',
    description: 'Discover the secret corners and hidden treasures of Paris that most tourists never see.',
    duration: '4 hours',
    groupSize: 'Small group (max 8)',
    included: [
      'Local expert guide',
      'Walking tour',
      'Entry to hidden courtyards',
      'Traditional French snack'
    ],
    highlights: [
      'Secret passageways',
      'Historic courtyards',
      'Local artisan shops',
      'Hidden gardens'
    ]
  },
  {
    id: 2,
    name: 'Tokyo Nightlife Adventure',
    location: 'Tokyo, Japan',
    price: 90,
    rating: 4.8,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=500',
    description: 'Experience the vibrant nightlife of Tokyo with a local guide.',
    duration: '5 hours',
    groupSize: 'Small group (max 6)',
    included: [
      'Local guide',
      '3 local food stops',
      'Transportation between locations',
      'Cultural insights'
    ],
    highlights: [
      'Local izakayas',
      'Hidden bars',
      'Street food markets',
      'Night views'
    ]
  }
];

const experiences: Experience[] = [
  {
    id: 1,
    name: 'Traditional Japanese Tea Ceremony',
    location: 'Kyoto, Japan',
    price: 65,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=500',
    description: 'Immerse yourself in the ancient art of Japanese tea ceremony.',
    duration: '2 hours',
    groupSize: 'Private (max 4)',
    included: [
      'Tea ceremony demonstration',
      'Hands-on experience',
      'Traditional sweets',
      'Cultural explanation'
    ],
    highlights: [
      'Authentic tea room',
      'Traditional kimono',
      'Matcha preparation',
      'Cultural insights'
    ],
    type: 'cultural'
  },
  {
    id: 2,
    name: 'Cooking Class in Tuscany',
    location: 'Florence, Italy',
    price: 120,
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=500',
    description: 'Learn to cook authentic Italian dishes in a traditional Tuscan kitchen.',
    duration: '4 hours',
    groupSize: 'Small group (max 8)',
    included: [
      'Professional chef instructor',
      'All ingredients',
      'Wine tasting',
      'Recipe booklet'
    ],
    highlights: [
      'Handmade pasta',
      'Local ingredients',
      'Wine pairing',
      'Traditional techniques'
    ],
    type: 'food'
  },
  {
    id: 3,
    name: 'Amazon Rainforest Adventure',
    location: 'Manaus, Brazil',
    price: 150,
    rating: 4.7,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1541873676-a18131494184?w=500',
    description: 'Explore the wonders of the Amazon rainforest with expert guides.',
    duration: 'Full day',
    groupSize: 'Small group (max 10)',
    included: [
      'Expert naturalist guide',
      'Boat transportation',
      'Lunch in the jungle',
      'Safety equipment'
    ],
    highlights: [
      'Wildlife spotting',
      'Jungle trekking',
      'River exploration',
      'Local village visit'
    ],
    type: 'adventure'
  }
];

// Generic function to simulate API delay
const simulateApiCall = async <T>(data: T): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return data;
};

// Service functions
export const getCarById = async (id: number): Promise<Car | null> => {
  const car = cars.find(c => c.id === Number(id));
  return simulateApiCall(car || null);
};

export const getAllCars = async (): Promise<Car[]> => {
  return simulateApiCall(cars);
};

export const getFlightById = async (id: number): Promise<Flight | null> => {
  const flight = flights.find(f => f.id === Number(id));
  return simulateApiCall(flight || null);
};

export const getAllFlights = async (): Promise<Flight[]> => {
  return simulateApiCall(flights);
};

export const getHotelById = async (id: number): Promise<Hotel | null> => {
  const hotel = hotels.find(h => h.id === Number(id));
  return simulateApiCall(hotel || null);
};

export const getAllHotels = async (): Promise<Hotel[]> => {
  return simulateApiCall(hotels);
};

export const getActivityById = async (id: number): Promise<Activity | null> => {
  const activity = activities.find(a => a.id === Number(id));
  return simulateApiCall(activity || null);
};

export const getAllActivities = async (): Promise<Activity[]> => {
  return simulateApiCall(activities);
};

export const getExploreById = async (id: number): Promise<Explore | null> => {
  const explore = explores.find(e => e.id === Number(id));
  return simulateApiCall(explore || null);
};

export const getAllExplores = async (): Promise<Explore[]> => {
  return simulateApiCall(explores);
};

export const getExperienceById = async (id: number): Promise<Experience | null> => {
  const experience = experiences.find(e => e.id === Number(id));
  return simulateApiCall(experience || null);
};

export const getAllExperiences = async (): Promise<Experience[]> => {
  return simulateApiCall(experiences);
}; 