import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="text-lg font-bold text-white">
            <a href="/">BrandName</a>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex space-x-4">
            <a href="#about" className="hover:text-white">
              About
            </a>
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>
        </div>

        <hr className="my-4 border-gray-600" />

        <div className="flex flex-wrap justify-between items-center">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
          </div>

          {/* Copyright Info */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BrandName. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
