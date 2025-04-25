import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
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
    <div className="bg-white rounded-lg overflow-hidden border-none w-full">
      <div className="relative h-56 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center text-xs text-teal-600 font-medium mb-2">
          <span>{post.author.name} • </span>
          <span className="flex items-center">
            <Calendar size={14} className="ml-1 mr-1" />
            {post.date}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/blog/${post.id}`}
          className="flex items-center text-teal-600 font-medium text-sm"
        >
          <span className="mr-1">Read more</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-lg overflow-hidden border flex  gap-4 border-gray-200">
      <div className="relative h-[180px] w-80 bg-cover overflow-hidden"> 
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col justify-between">
        <div className="flex items-center text-xs text-teal-600 font-medium mb-2">
          <span>{post.author.name} • </span>
          <span className="flex items-center">
            <Calendar size={14} className="ml-1 mr-1" />
            {post.date}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {post.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;