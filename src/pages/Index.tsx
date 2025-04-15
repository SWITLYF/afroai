import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";
import BlogGrid from "@/components/BlogGrid";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";

interface HeroSectionProps {
  onCreatePost: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCreatePost }) => {
  return (
    <section>
      {/* Hero section content */}
      <button onClick={onCreatePost}>Create Post</button>
    </section>
  );
};

const fetchPosts = async (page: number) => {
  const response = await fetch(`http://localhost:5000/api/posts?page=${page}&limit=6`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
  });

  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Callback to refresh posts after creating a new one
  const handlePostCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setShowModal(false);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow text-center py-8">
          <p className="text-red-600">Error fetching posts: {(error as Error).message}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <HeroSection onCreatePost={() => setShowModal(true)} />
        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading posts...</p>
          </div>
        ) : (
          <>
            <BlogSection
              title="Recent blog posts"
              posts={posts.slice(0, 3)} // Show first 3 posts as recent
              showViewAll
            />
            <BlogGrid posts={posts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
      <Footer />
      <Modal show={showModal} onClose={() => setShowModal(false)} onPostCreated={handlePostCreated} />
    </div>
  );
};

export default Index;