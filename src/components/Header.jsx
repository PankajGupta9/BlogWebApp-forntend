import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">BrandName</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/admin" className="hover:text-gray-300">
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
