import React from "react";
import { BlogPostType } from "./BlogCard";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa6";

type BlogGridProps = {
  posts: BlogPostType[];
};

const BlogGrid = ({ posts }: BlogGridProps) => {
  if (!posts.length) {
    return (
      <div className="py-8 px-4 md:px-8 lg:px-16">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          All blog posts
        </h2>
        <p className="text-gray-600">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">All blog posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex items-center space-x-1 mb-3 justify-between">
              <div className="flex items-center text-xs text-teal-600 font-medium gap-4">
                  <span className="flex items-center bg-gray-100 rounded-full p-2">
                    <IoCopyOutline size={20}/>
                  </span>
                  <span className="flex items-center bg-gray-100 rounded-full p-2">
                    <FaRegCommentDots size={20} />
                  </span>
                </div>

                
                  <div
                    className="p-4 flex items-center justify-center"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png" alt="profile" width={30} height={30} className="m-[-5px] bg-gray-100 rounded-full" />
                    <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png" alt="profile" width={30} height={30} className="m-[-5px] bg-gray-100 rounded-full" />
                    <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png" alt="profile" width={30} height={30} className="m-[-5px] bg-gray-100 rounded-full" />
                    <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png" alt="profile" width={30} height={30} className="m-[-5px] bg-gray-100 rounded-full" />
                  </div>
                
              </div>

              <h3 className="text-lg font-medium mb-2 group-hover:text-brand-green transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={
                      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png"
                    }
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm font-medium">
                    {post.author.name}
                  </span>
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
