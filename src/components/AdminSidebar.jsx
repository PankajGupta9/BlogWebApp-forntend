import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink
import { FaPlus, FaEdit, FaList, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="text-white shadow-md">
      {/* Sidebar Links */}
      <div className="mt-8">
        <nav>
          <ul>
          {/* All Blogs */}
          <li className="rounded-lg">
              <NavLink
                to="/admin/all-blogs"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-lg ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
                }
              >
                <FaList className="mr-3" /> All Blogs
              </NavLink>
            </li>
            {/* Create Blog */}
            <li className="rounded-lg">
              <NavLink
                to="/admin/create"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-lg ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
                }
              >
                <FaPlus className="mr-3" /> Create
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-8">
          <button className="flex items-center px-4 py-3 w-full text-lg bg-red-600 hover:bg-red-700 rounded-lg">
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
