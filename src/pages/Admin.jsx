import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import CreateBlog from '../components/CreateBlog';
import UpdateBlog from '../components/UpdateBlog';
import AllBlogs from '../components/AllBlogs';

const Admin = () => {
  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-4xl bg-red-600 font-bold text-gray-800 text-center py-2">
        Admin Panel
      </h1>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-800 text-white p-4">
          <AdminSidebar />
        </div>
        <div className="flex-1 p-6 overflow-y-auto h-full">
          {/* Routes for Admin Content */}
          <Routes>
            <Route index element={<AllBlogs/>} />
            <Route path="/all-blogs" element={<AllBlogs />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/update/:id" element={<UpdateBlog />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
