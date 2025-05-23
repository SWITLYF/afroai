import React from "react";
import BlogCard, { BlogPostType } from "./BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅

type BlogSectionProps = {
  title: string;
  posts: BlogPostType[];
  showViewAll?: boolean;
};

const BlogSection = ({ title, posts, showViewAll = false }: BlogSectionProps) => {
  const navigate = useNavigate(); // ✅

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 3);

  if (!posts.length) {
    return (
      <div className="py-8 px-4 md:px-8 lg:px-16">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600">No recent posts available.</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {showViewAll && (
          <Button
            variant="ghost"
            className="text-teal-600 font-medium hover:text-teal-600 hover:bg-gray-100"
            onClick={() => navigate("/all-posts")} // ✅ Navigate
          >
            View all <ArrowRight size={16} className="ml-1" />
          </Button>
        )}
      </div>
      <div className="flex flex-start flex-col md:flex-row gap-6">
        <div className="md:w-2/5">
          {featuredPost && <BlogCard post={featuredPost} featured />}
        </div>
        <div className="md:w-3/5 flex flex-col gap-4">
          {regularPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
