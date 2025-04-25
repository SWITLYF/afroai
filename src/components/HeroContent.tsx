// components/ui/HeroContent.tsx

import React from "react";

interface HeroContentProps {
  onCreatePost: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onCreatePost }) => {
  return (
    <div className="text-center py-10">
      <div className="text-4xl font-bold flex align-center justify-center gap-4">
        <h1>STORIES</h1>
        <h1 className="text-teal-500">AND</h1>
        <h1>PROMPT</h1>
      </div>
      <br />
      <p>Subscribe to learn about new product features, the latest in technology, <br /> solutions and updates.</p>
    </div>
  );
};

export default HeroContent;
