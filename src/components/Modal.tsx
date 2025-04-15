import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
    featured: false,
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement;
    const files = (e.target as HTMLInputElement).files;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "featured") {
        data.append(key, value ? "1" : "0");
      } else if (value !== null) {
        data.append(key, value as string | Blob);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/posts/create", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
      if (onPostCreated) onPostCreated();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create post.",
        variant: "destructive",
      });
      console.error("Error creating post:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            rows={4}
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 mb-4"
            accept="image/*"
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mr-2"
            />
            Featured
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-green text-white rounded-md"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;