import React from 'react';
import { FaEye, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useFetchBlogsQuery, useDeleteBlogMutation } from '../redux/api/blogApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
  const { data, error, isLoading, refetch } = useFetchBlogsQuery();
  const blogs = data ? data.blogs : []; // Access blogs from the response object
  const [deleteBlog] = useDeleteBlogMutation();
  const navigate = useNavigate(); // hook for navigation

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      toast.success('Blog deleted successfully!');
      // Update the local blogs state after deletion
      refetch(); // Optionally refetch data to ensure the UI is updated
    } catch (err) {
      toast.error('Failed to delete blog');
    }
  };

  const truncateContent = (content) => {
    const words = content.split(' ');
    return words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
  };

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Failed to load blogs: {error.message || error}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div className="text-center text-xl">No blogs available</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">All Blogs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Image</th> {/* Column for image */}
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Content</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b">
                <td className="py-3 px-4 text-center">
                  {/* Display image in a circle with a default fallback */}
                  <img
                    src={blog.image || 'https://via.placeholder.com/150'} // Default image URL
                    alt={blog.title || 'Default Image'}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} // Fallback if the image fails to load
                    className="w-12 h-12 rounded-full object-cover" // Circle styling
                  />
                </td>
                <td className="py-3 px-4">{blog.title}</td>
                <td className="py-3 px-4">{truncateContent(blog.content)}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="text-blue-600 hover:text-blue-800 mx-2"
                    onClick={() => window.location.href = `/blog/${blog._id}`}
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mx-2"
                    onClick={() => navigate(`/admin/update/${blog._id}`)} // Navigate to the edit page
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 mx-2"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <FaTrashAlt size={20} />
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

export default AllBlogs;
