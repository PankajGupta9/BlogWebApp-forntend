import React, { useState } from 'react';
import { useCreateBlogMutation, useFetchBlogsQuery } from '../redux/api/blogApi'; // Import useFetchBlogsQuery here
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageLink, setImageLink] = useState('');

  const [createBlog] = useCreateBlogMutation();
  const { refetch } = useFetchBlogsQuery(undefined, { skip: true }); // Refetching the blogs after creation

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const uploadPreset = "IBM_Project";
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);

    try {
      // Uploading image
      const res = await axios.post(uploadUrl, uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedFileUrl = res.data.secure_url;
      setImageLink(uploadedFileUrl); // Set the uploaded image link
    } catch (error) {
      console.error('Image upload failed', error);
      toast.error("Image upload failed", { theme: "dark" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const blogData = {
      title,
      category,
      content,
      tags: tagArray,
      image: imageLink,
    };

    try {
      await createBlog(blogData).unwrap();
      navigate("/admin"); // Navigate to admin page
      refetch(); // Refetch blogs after creating a new one
      toast.success("Blog created successfully!", { theme: "dark" });
    } catch (error) {
      toast.error("Blog creation failed", { theme: "dark" });
      console.error('Blog creation failed', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-16">
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">Create Blog</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Blog Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
            rows="6"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-lg font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={handleTagsChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image Upload</label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
