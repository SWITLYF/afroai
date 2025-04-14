
import React from 'react';
import { BlogPostType } from './BlogCard';
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

type BlogGridProps = {
  posts: BlogPostType[];
};

const BlogGrid = ({ posts }: BlogGridProps) => {
  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">All blog posts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="group bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex items-center space-x-1 mb-3">
                {post.tags?.map((tag, index) => (
                  <div key={index} className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">
                    <span className="text-xs text-gray-600">{index + 1}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium mb-2 group-hover:text-brand-green transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm font-medium">{post.author.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;
