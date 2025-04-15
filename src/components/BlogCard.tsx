import React from "react";
import { Calendar, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export type BlogPostType = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
  };
  category?: string;
  readingTime?: string;
  tags?: string[];
};

type BlogCardProps = {
  post: BlogPostType;
  featured?: boolean;
};

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return featured ? (
    <div className="group bg-white rounded-md overflow-hidden shadow-sm border border-gray-200">
      <div className="relative h-48 md:h-64 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {post.date}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-green transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="flex items-center text-brand-green font-medium text-sm group-hover:underline"
          >
            <span className="mr-1">Read more</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="group bg-white rounded-md overflow-hidden shadow-sm border border-gray-200">
      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {post.date}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-green transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-xs line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
            <span className="text-xs">{post.author.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;