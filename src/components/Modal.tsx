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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value =
      type === "file"
        ? (e.target as HTMLInputElement).files?.[0] || null
        : type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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

      const result = await response.json();
      if (!response.ok) {
        console.error("Failed:", result);
        throw new Error(result.error || "Failed to create post");
      }

      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      // Reset form
      setFormData({ title: "", content: "", image: null, featured: false });
      if (onPostCreated) onPostCreated();
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create post.",
        variant: "destructive",
      });
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-green text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
