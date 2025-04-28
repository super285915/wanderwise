import React, { useState } from 'react';
import Button from '../common/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setEmail('');
    }, 500);
  };

  return (
    <section className="py-16 bg-primary-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Get Exclusive Travel Deals
          </h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter and receive personalized travel deals, destination
            recommendations, and travel tips directly in your inbox.
          </p>

          {isSubmitted ? (
            <div className="bg-white/10 rounded-lg p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-2">Thank You for Subscribing!</h3>
              <p className="text-primary-100">
                Watch your inbox for exclusive travel deals and inspiration coming your way soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="whitespace-nowrap"
              >
                Subscribe Now
              </Button>
            </form>
          )}

          <p className="text-primary-200 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;