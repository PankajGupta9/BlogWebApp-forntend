import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBlogByIdQuery, useUpdateBlogMutation } from '../redux/api/blogApi';
import { toast } from 'react-toastify';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blogData, error, isLoading } = useGetBlogByIdQuery(id);
  const [updateBlog] = useUpdateBlogMutation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (blogData && blogData.blog) {
      const { title, content, image, tags, category } = blogData.blog;
      setTitle(title);
      setCategory(category || '');
      setContent(content);
      setTags(tags ? tags.join(', ') : '');
      setImage(image || '');
    }
  }, [blogData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title,
      category,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
      image,
    };

    try {
      await updateBlog({ id, blogData: updatedData }).unwrap();
      toast.success('Blog updated successfully!');
      navigate('/admin');
    } catch (err) {
      toast.error('Failed to update blog');
    }
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-500">Failed to load blog: {error.message || error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Update Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Blog Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-lg font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image Link</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
