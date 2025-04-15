// components/CreatePostButton.tsx

import React from "react";

interface CreatePostButtonProps {
  onClick: () => void;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
    >
      Create Post
    </button>
  );
};

export default CreatePostButton;
