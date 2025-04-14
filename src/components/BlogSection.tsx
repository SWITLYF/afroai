
import React from 'react';
import BlogCard, { BlogPostType } from './BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type BlogSectionProps = {
  title: string;
  posts: BlogPostType[];
  showViewAll?: boolean;
};

const BlogSection = ({ title, posts, showViewAll = false }: BlogSectionProps) => {
  // Show the first post as featured and the rest as regular
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 3); // Only show the next 2 posts in this section

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" className="text-brand-green hover:text-brand-green hover:bg-gray-100">
            View all <ArrowRight size={16} className="ml-1" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <BlogCard post={featuredPost} featured />
        </div>
        
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <div key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
