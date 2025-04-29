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
  {
    id: 2,
    name: 'Tesla Model 3',
    type: 'Electric',
    location: 'San Francisco Airport',
    price: 85,
    rating: 4.9,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
    features: ['Autopilot', 'Premium Sound', 'Supercharger Access', 'All Glass Roof'],
    transmission: 'Automatic',
    seats: 5,
    description: 'Drive the future with our Tesla Model 3. Zero emissions with cutting-edge technology and performance.'
  },
  {
    id: 3,
    name: 'Jeep Wrangler',
    type: 'SUV',
    location: 'Denver International Airport',
    price: 65,
    rating: 4.6,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500',
    features: ['4x4', 'Removable Top', 'Off-Road Capability', 'Bluetooth'],
    transmission: 'Manual',
    seats: 4,
    description: 'Adventure awaits with our rugged Jeep Wrangler. Perfect for exploring mountain roads and off-road trails.'
  },
  {
    id: 4,
    name: 'BMW 5 Series',
    type: 'Luxury',
    location: 'New York JFK Airport',
    price: 95,
    rating: 4.8,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
    features: ['Leather Seats', 'Premium Sound System', 'Navigation', 'Heated Seats'],
    transmission: 'Automatic',
    seats: 5,
    description: 'Experience luxury and performance with our BMW 5 Series. Elegant design with powerful performance.'
  },
  {
    id: 5,
    name: 'Honda CR-V',
    type: 'SUV',
    location: 'Chicago O\'Hare Airport',
    price: 55,
    rating: 4.5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1568844293986-ca9c5c1bc2e8?w=500',
    features: ['Spacious Cargo', 'Backup Camera', 'Bluetooth', 'Fuel Efficient'],
    transmission: 'Automatic',
    seats: 5,
    description: 'Versatile and reliable, our Honda CR-V is perfect for family trips or business travel with plenty of space.'
  }
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
  {
    id: 2,
    airline: 'Singapore Airlines',
    from: 'Los Angeles (LAX)',
    to: 'Tokyo (NRT)',
    departureTime: '11:30 AM',
    arrivalTime: '04:45 PM',
    duration: '12h 15m',
    price: 1250,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=500',
    stops: 0,
    description: 'Experience world-class service on our direct flight from Los Angeles to Tokyo.',
    amenities: ['Premium Wi-Fi', 'Award-winning Entertainment', 'Chef-prepared Meals', 'Lie-flat Seats']
  },
  {
    id: 3,
    airline: 'Lufthansa',
    from: 'Chicago (ORD)',
    to: 'Frankfurt (FRA)',
    departureTime: '06:45 PM',
    arrivalTime: '10:30 AM',
    duration: '8h 45m',
    price: 780,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=500',
    stops: 0,
    description: 'Fly with German precision and comfort on our overnight flight to Frankfurt.',
    amenities: ['Wi-Fi', 'Entertainment System', 'European Cuisine', 'USB Charging']
  },
  {
    id: 4,
    airline: 'Delta Airlines',
    from: 'Atlanta (ATL)',
    to: 'Paris (CDG)',
    departureTime: '08:15 PM',
    arrivalTime: '11:05 AM',
    duration: '8h 50m',
    price: 920,
    rating: 4.5,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=500',
    stops: 0,
    description: 'Enjoy Southern hospitality on your journey to the City of Lights.',
    amenities: ['Wi-Fi', 'Delta Studio Entertainment', 'Chef-curated Meals', 'Power Outlets']
  },
  {
    id: 5,
    airline: 'Qatar Airways',
    from: 'Miami (MIA)',
    to: 'Dubai (DXB)',
    departureTime: '10:30 PM',
    arrivalTime: '07:15 PM',
    duration: '15h 45m',
    price: 1150,
    rating: 4.8,
    reviews: 298,
    image: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=500',
    stops: 1,
    description: 'Experience 5-star luxury with a brief stopover in Doha on your way to Dubai.',
    amenities: ['Oryx Entertainment', 'Gourmet Dining', 'Complimentary Amenity Kit', 'Spacious Seating']
  }
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
  {
    id: 2,
    name: 'Grand Plaza Hotel',
    location: 'New York City',
    price: 320,
    rating: 4.6,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
    description: 'Luxury in the heart of Manhattan with stunning city views and premium service.',
    amenities: ['Fitness Center', 'Restaurant', 'Business Center', 'Concierge'],
    roomTypes: [
      {
        name: 'Deluxe King',
        price: 320,
        capacity: 2,
        features: ['City View', 'King Bed', 'Work Desk']
      },
      {
        name: 'Executive Suite',
        price: 520,
        capacity: 3,
        features: ['Separate Living Area', 'Premium Amenities', 'Skyline View']
      }
    ]
  },
  {
    id: 3,
    name: 'Sakura Ryokan',
    location: 'Kyoto, Japan',
    price: 280,
    rating: 4.9,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=500',
    description: 'Traditional Japanese inn offering authentic cultural experiences and tranquil gardens.',
    amenities: ['Onsen (Hot Spring)', 'Traditional Garden', 'Tea Ceremony', 'Kaiseki Dining'],
    roomTypes: [
      {
        name: 'Traditional Tatami Room',
        price: 280,
        capacity: 2,
        features: ['Tatami Flooring', 'Futon Bedding', 'Garden View']
      },
      {
        name: 'Deluxe Ryokan Suite',
        price: 450,
        capacity: 4,
        features: ['Private Onsen', 'Tatami Area', 'Western Beds', 'Private Garden']
      }
    ]
  },
  {
    id: 4,
    name: 'Vineyard Retreat',
    location: 'Tuscany, Italy',
    price: 350,
    rating: 4.7,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500',
    description: 'Charming countryside estate surrounded by vineyards with authentic Italian hospitality.',
    amenities: ['Wine Tasting', 'Pool', 'Restaurant', 'Cooking Classes'],
    roomTypes: [
      {
        name: 'Classic Room',
        price: 350,
        capacity: 2,
        features: ['Vineyard View', 'Queen Bed', 'Rustic Decor']
      },
      {
        name: 'Farmhouse Suite',
        price: 580,
        capacity: 4,
        features: ['Separate Living Area', 'Private Terrace', 'Kitchenette']
      }
    ]
  },
  {
    id: 5,
    name: 'Desert Oasis Resort',
    location: 'Dubai, UAE',
    price: 390,
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500',
    description: 'Luxury desert retreat combining Arabian heritage with modern luxury.',
    amenities: ['Desert Safari', 'Spa', 'Multiple Restaurants', 'Infinity Pool'],
    roomTypes: [
      {
        name: 'Desert View Room',
        price: 390,
        capacity: 2,
        features: ['Desert Panorama', 'King Bed', 'Luxury Bathroom']
      },
      {
        name: 'Royal Desert Suite',
        price: 750,
        capacity: 3,
        features: ['Private Terrace', 'Plunge Pool', 'Butler Service']
      }
    ]
  }
];

const activities: Activity[] = [
  {
    id: 1,
    name: 'City Tour',
    location: 'New York',
    price: 50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500',
    description: 'Explore the iconic landmarks of New York City with our expert guides. Visit Times Square, Central Park, and more.'
  },
  {
    id: 2,
    name: 'Snorkeling Adventure',
    location: 'Great Barrier Reef, Australia',
    price: 120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
    description: 'Discover the underwater wonders of the Great Barrier Reef with professional guides and quality equipment.'
  },
  {
    id: 3,
    name: 'Wine Tasting Tour',
    location: 'Napa Valley, California',
    price: 85,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500',
    description: 'Sample premium wines from renowned vineyards while learning about wine production and tasting techniques.'
  },
  {
    id: 4,
    name: 'Historical Walking Tour',
    location: 'Rome, Italy',
    price: 40,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500',
    description: 'Walk through ancient Rome with historians who bring the past to life at the Colosseum, Roman Forum, and more.'
  },
  {
    id: 5,
    name: 'Safari Adventure',
    location: 'Serengeti, Tanzania',
    price: 250,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500',
    description: 'Experience the thrill of seeing Africa\'s magnificent wildlife in their natural habitat with expert guides.'
  },
  {
    id: 6,
    name: 'Northern Lights Tour',
    location: 'Reykjavik, Iceland',
    price: 95,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579033385971-a7bc023a7015?w=500',
    description: 'Chase the magical Aurora Borealis with expert guides who know the best viewing locations away from city lights.'
  }
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
  },
  {
    id: 3,
    name: 'Ancient Mayan Discovery',
    location: 'Tulum, Mexico',
    price: 85,
    rating: 4.7,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=500',
    description: 'Explore the fascinating ruins of ancient Mayan civilization with an archaeologist guide.',
    duration: '6 hours',
    groupSize: 'Small group (max 10)',
    included: [
      'Archaeologist guide',
      'Transportation',
      'Entrance fees',
      'Bottled water',
      'Traditional lunch'
    ],
    highlights: [
      'Tulum ruins',
      'Coastal views',
      'Mayan history',
      'Swimming opportunity',
      'Local cuisine'
    ]
  },
  {
    id: 4,
    name: 'Venice Canals by Gondola',
    location: 'Venice, Italy',
    price: 95,
    rating: 4.9,
    reviews: 245,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500',
    description: 'Experience Venice from the water with a private gondola tour through hidden canals.',
    duration: '3 hours',
    groupSize: 'Private (max 4)',
    included: [
      'Private gondola',
      'Local guide',
      'Hidden canal routes',
      'Prosecco toast',
      'Photo opportunities'
    ],
    highlights: [
      'Secret canals',
      'Historic palazzos',
      'Local stories',
      'Bridge of Sighs',
      'Grand Canal views'
    ]
  },
  {
    id: 5,
    name: 'Moroccan Medina Exploration',
    location: 'Marrakech, Morocco',
    price: 65,
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1548018560-c7196548e84d?w=500',
    description: 'Navigate the labyrinthine streets of Marrakech\'s ancient medina with a local expert.',
    duration: '4 hours',
    groupSize: 'Small group (max 8)',
    included: [
      'Local guide',
      'Mint tea tasting',
      'Artisan workshop visits',
      'Spice market tour',
      'Traditional pastry'
    ],
    highlights: [
      'Hidden riads',
      'Artisan crafts',
      'Spice markets',
      'Local cuisine',
      'Historical sites'
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
  },
  {
    id: 4,
    name: 'Alpine Hiking Experience',
    location: 'Interlaken, Switzerland',
    price: 110,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500',
    description: 'Trek through stunning Alpine landscapes with experienced mountain guides.',
    duration: '6 hours',
    groupSize: 'Small group (max 8)',
    included: [
      'Professional mountain guide',
      'Safety equipment',
      'Picnic lunch',
      'Cable car tickets',
      'Photos of your experience'
    ],
    highlights: [
      'Breathtaking mountain views',
      'Alpine meadows',
      'Crystal clear lakes',
      'Local wildlife'
    ],
    type: 'adventure'
  },
  {
    id: 5,
    name: 'Northern Lights Photography',
    location: 'Tromsø, Norway',
    price: 180,
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=500',
    description: 'Capture the magical Aurora Borealis with expert photography guidance.',
    duration: '5 hours',
    groupSize: 'Small group (max 8)',
    included: [
      'Professional photographer guide',
      'Transportation to viewing spots',
      'Hot beverages',
      'Tripod rental',
      'Photography tips'
    ],
    highlights: [
      'Aurora hunting',
      'Photography instruction',
      'Arctic landscapes',
      'Small group experience'
    ],
    type: 'nature'
  },
  {
    id: 6,
    name: 'Balinese Cultural Immersion',
    location: 'Ubud, Bali',
    price: 75,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1604922824961-87cefb2e4b07?w=500',
    description: 'Experience authentic Balinese culture through traditional arts and rituals.',
    duration: '4 hours',
    groupSize: 'Small group (max 10)',
    included: [
      'Local cultural guide',
      'Temple offerings',
      'Traditional dance show',
      'Balinese lunch',
      'Craft workshop'
    ],
    highlights: [
      'Temple ceremony',
      'Traditional dance',
      'Offering making',
      'Local cuisine'
    ],
    type: 'cultural'
  },
  {
    id: 7,
    name: 'Street Food Tour',
    location: 'Bangkok, Thailand',
    price: 55,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
    description: 'Explore Bangkok\'s vibrant street food scene with a local food expert.',
    duration: '3 hours',
    groupSize: 'Small group (max 8)',
    included: [
      'Local food guide',
      '6-8 food tastings',
      'One local beverage',
      'Food market tour',
      'Cooking demonstration'
    ],
    highlights: [
      'Authentic local dishes',
      'Hidden food stalls',
      'Culinary history',
      'Market exploration'
    ],
    type: 'food'
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