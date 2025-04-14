
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="text-sm"
      >
        <ArrowLeft size={16} />
        <span className="sr-only">Previous</span>
      </Button>
      
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 p-0 ${page === currentPage ? 'bg-brand-green hover:bg-brand-green text-white' : ''}`}
        >
          {page}
        </Button>
      ))}
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="text-sm"
      >
        <ArrowRight size={16} />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );
};

export default Pagination;
