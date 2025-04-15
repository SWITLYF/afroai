// components/ui/HeroContent.tsx

import React from "react";
import CreatePostButton from "./CreatePostButton";

interface HeroContentProps {
  onCreatePost: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onCreatePost }) => {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Blog</h1>
      <p className="mb-6 text-gray-600">
        Share your thoughts and read from others.
      </p>
      <CreatePostButton onClick={onCreatePost} />
    </div>
  );
};

export default HeroContent;
