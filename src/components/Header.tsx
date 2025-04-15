
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="py-6 px-4 md:px-8 lg:px-16 flex justify-between items-center border-b border-gray-100">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/0bfa8799-43e4-40a6-9d3a-6d757bc3aa6d.png" 
            alt="APRO.AI Logo" 
            className="h-8 w-auto" 
          />
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-sm font-medium hover:text-brand-green">HOME</Link>
        <Link to="/about" className="text-sm font-medium hover:text-brand-green">ABOUT</Link>
        <Link to="/blog" className="text-sm font-medium hover:text-brand-green">BLOG</Link>
        <Link to="/products" className="text-sm font-medium hover:text-brand-green">PRODUCTS</Link>
        <Link to="/community" className="text-sm font-medium hover:text-brand-green">COMMUNITY</Link>
        <Link to="/login" className="text-sm font-medium hover:text-brand-green">LOGIN</Link>
      </nav>
      

      <div className='flex gap-2'>
        <p className='flex items-center text-sm bg-white border border-2-green rounded-full px-4 py-2 cursor-pointer'>
          LOGIN
        </p>
        <p className='flex bg-green-500 text-sm items-center bg-white border border-2-green rounded-full px-4 py-2 cursor-pointer'>
          GET STARTED
        </p>
      </div>
    </header>
  );
};

export default Header;
