import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard, { BlogPostType } from "@/components/BlogCard";

const AllPostsPage = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.error("Error fetching all posts:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading posts...</div>;
  }

  if (!posts.length) {
    return <div className="text-center mt-10">No posts found.</div>;
  }

  return (
    <div className="py-10 px-4 md:px-8 lg:px-16">
      <h1 className="text-2xl font-bold mb-6">All Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPostsPage;
