
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 text-center max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <span className="text-black">STORIES </span>
        <span className="text-brand-green">AND PROMPT</span>
      </h1>
      <p className="text-base md:text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
        Subscribe to learn about new product features, the latest in technology,
        solutions, and updates.
      </p>
      <Button className="bg-brand-green hover:bg-opacity-90 text-white rounded-md px-6 py-2">
        SIGN UP
      </Button>
    </div>
  );
};

export default HeroSection;
