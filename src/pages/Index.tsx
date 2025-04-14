
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import BlogSection from '@/components/BlogSection';
import BlogGrid from '@/components/BlogGrid';
import Pagination from '@/components/Pagination';
import { recentPosts, allPosts } from '@/data/blogPosts';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // For demo purposes
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real application, you would fetch posts for the selected page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <BlogSection 
          title="Recent blog posts" 
          posts={recentPosts} 
          showViewAll
        />
        
        <BlogGrid posts={allPosts} />
        
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
