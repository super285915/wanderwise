import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrendingDestinations from '../components/home/TrendingDestinations';
import PopularHotels from '../components/home/PopularHotels';
import FeaturedFlights from '../components/home/FeaturesFlight';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrendingDestinations />
      <PopularHotels />
      <FeaturedFlights />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;