import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="h-16 w-full bg-white px-8 flex items-center justify-between shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center">
        <span className="text-2xl font-semibold text-gray-900 tracking-tight font-sans">Mis-3</span>
      </div>

      {/* Right: Nav Links + Upload Button + Avatar */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black transition">
          Dashboard
        </Link>

        {/* Upload Button – outlined style */}
        <Link
          to="/upload"
          className="px-4 py-1.5 rounded-md border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition shadow-sm"
        >
          Upload
        </Link>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-800 font-semibold flex items-center justify-center shadow-inner text-sm">
          AG
        </div>
      </div>
    </nav>
  );
};
