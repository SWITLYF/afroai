import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePostButton from "./CreatePostButton";
import Modal from "./Modal"; // ✅ Import your Modal component

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  featured: number;
  editing?: boolean;
}

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false); // ✅ State to control modal

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch posts", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const handleEdit = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, editing: true } : post
      )
    );
  };

  const handleChange = (id: string, field: keyof Post, value: string | number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, [field]: value } : post
      )
    );
  };

  const handleSave = async (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, {
        title: post.title,
        content: post.content,
        featured: post.featured,
      });

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === id ? { ...p, editing: false } : p
        )
      );
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  const handleCreatePost = () => {
    setShowModal(true); // ✅ Open the modal
  };

  const handlePostCreated = () => {
    setShowModal(false);
    fetchPosts(); // ✅ Refresh posts after creation
  };

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <CreatePostButton onClick={handleCreatePost} />
      </div>

      {/* ✅ The Modal for Creating Posts */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onPostCreated={handlePostCreated}
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Content</th>
              <th className="border px-4 py-2">Featured</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {post.editing ? (
                    <input
                      type="text"
                      value={post.title}
                      className="border p-1 w-full"
                      onChange={(e) =>
                        handleChange(post.id, "title", e.target.value)
                      }
                    />
                  ) : (
                    post.title
                  )}
                </td>
                <td className="border px-4 py-2">
                  {post.editing ? (
                    <textarea
                      rows={2}
                      className="border p-1 w-full"
                      value={post.content || ""}
                      onChange={(e) =>
                        handleChange(post.id, "content", e.target.value)
                      }
                    />
                  ) : post.content ? (
                    post.content.length > 50
                      ? post.content.substring(0, 50) + "..."
                      : post.content
                  ) : (
                    "No content"
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  {post.editing ? (
                    <select
                      value={post.featured}
                      onChange={(e) =>
                        handleChange(post.id, "featured", Number(e.target.value))
                      }
                      className="border p-1"
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                  ) : post.featured === 1 ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2 text-center">
                  {post.editing ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleSave(post.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(post.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
