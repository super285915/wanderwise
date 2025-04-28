import React from 'react';
import { Star } from 'lucide-react';
import Card from '../common/Card';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    text: 'WanderWise made planning our honeymoon incredibly easy. The recommendations were spot-on and we saved a lot compared to other travel sites. Will definitely use again for our next trip!',
    destination: 'Bali, Indonesia',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    text: 'As a frequent business traveler, I appreciate how WanderWise remembers my preferences. The interface is intuitive, and their customer service is exceptional when I needed to make last-minute changes.',
    destination: 'Tokyo, Japan',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    location: 'Barcelona, Spain',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4,
    text: 'I planned an entire family vacation through WanderWise and was impressed by how child-friendly all their recommendations were. The price comparison tool saved us hundreds on flights!',
    destination: 'Costa Rica',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from real travelers who discovered their perfect getaway with WanderWise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              elevation="medium"
              className="h-full flex flex-col"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-accent-500 fill-accent-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 flex-grow italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                    <p className="text-xs text-primary-600 mt-1">
                      Trip to {testimonial.destination}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;