// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Wordle Game</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/users"
                className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                User List
              </Link>
              <Link
                to="/game"
                className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Game
              </Link>
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 text-white"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/users"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 text-white"
              onClick={() => setIsOpen(false)}
            >
              User List
            </Link>
            <Link
              to="/game"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 text-white"
              onClick={() => setIsOpen(false)}
            >
              Game
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
