import React, { useState } from 'react';
import { useFetchBlogsQuery } from '../redux/api/blogApi';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortOptions, setSortOptions] = useState({ new: false, old: false, name: false });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const blogsPerPage = 10;

  const { data, error, isLoading } = useFetchBlogsQuery();
  const blogs = data ? data.blogs : [];

  // Filter Blogs by Title
  const handleSearch = () => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  // Sort Blogs
  const handleSort = (option) => {
    const updatedSortOptions = { ...sortOptions };

    if (option === 'new') {
      updatedSortOptions.new = true;
      updatedSortOptions.old = false;
    } else if (option === 'old') {
      updatedSortOptions.old = true;
      updatedSortOptions.new = false;
    } else if (option === 'name') {
      updatedSortOptions.name = !updatedSortOptions.name;
    }

    setSortOptions(updatedSortOptions);

    let sortedBlogs = [...(filteredBlogs.length > 0 ? filteredBlogs : blogs)];

    if (updatedSortOptions.new) {
      sortedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (updatedSortOptions.old) {
      sortedBlogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    if (updatedSortOptions.name) {
      sortedBlogs.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredBlogs(sortedBlogs);
  };

  // Filter by Category (multiple categories allowed)
  const handleCategoryFilter = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);

    let filtered = blogs;
    if (updatedCategories.length > 0) {
      filtered = blogs.filter((blog) => updatedCategories.includes(blog.category));
    }
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  const activeBlogs = filteredBlogs.length > 0 ? filteredBlogs : blogs;

  // Pagination Logic
  const totalPages = Math.ceil(activeBlogs.length / blogsPerPage);
  const currentBlogs = activeBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const truncateContent = (content) => {
    return content.length > 50 ? content.slice(0, 50) + '...' : content;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset Filters function
  const resetFilters = () => {
    setSearchTerm('');
    setFilteredBlogs([]);
    setSortOptions({ new: false, old: false, name: false });
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500">
        Failed to load blogs: {error.message || error}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return <div className="text-center text-xl">No blogs available</div>;
  }

  const uniqueCategories = [...new Set(blogs.map((blog) => blog.category))];

  return (
    <div className="container mx-auto p-6">
      {/* Search Section */}
      <div className="mb-6 text-center">
        <input
          type="text"
          className="border px-4 py-5 rounded-md w-full md:w-1/2 border-black"
          placeholder="Search blogs by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-5 px-8 py-5 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Layout: Filters and Blogs */}
      <div className="flex">
        {/* Filter Section */}
        <div className="w-1/4 pr-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          <div className="mb-4">
            <h3 className="block font-semibold mb-2">Sort By</h3>
            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="radio"
                  name="sort"
                  checked={sortOptions.new}
                  onChange={() => handleSort('new')}
                />
                <span className="ml-2">Newest</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  checked={sortOptions.old}
                  onChange={() => handleSort('old')}
                />
                <span className="ml-2">Oldest</span>
              </label>
            </div>
            <div className='mt-5'>
              <label>
                <h1>Sort by name</h1>
                <input
                  className='mt-3'
                  type="checkbox"
                  checked={sortOptions.name}
                  onChange={() => handleSort('name')}
                />
                <span className="ml-2">Name</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="block font-semibold mb-2">Filter By Category</h3>
            <div className="flex flex-col gap-2">
              {uniqueCategories.map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryFilter(category)}
                  />
                  <span className="ml-2">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Filter Button */}
          <div className="mt-4 text-center">
            <button
              className="px-8 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Blogs Display */}
        <div className="w-3/4 mt-5">
          <h1 className="text-3xl text-center font-bold text-gray-700 mb-8">All Blogs</h1>
          <div className="space-y-4">
            {currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="border p-4 rounded-lg shadow-md bg-white flex flex-col md:flex-row gap-4"
              >
                <div className="w-full md:w-1/4">
                  <img
                    src={blog.image || 'https://via.placeholder.com/150'}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-3/4 flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                  <p className="text-gray-600">{truncateContent(blog.content)}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 self-start"
                    onClick={() => (window.location.href = `/blog/${blog._id}`)}
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
