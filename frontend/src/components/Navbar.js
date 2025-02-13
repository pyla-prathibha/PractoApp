import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Clickable logo redirecting to home */}
          <Link to="/home" className="flex items-center mr-6">
            <img 
              src="/logo.png" 
              alt="Practo Logo" 
              className="w-10 h-10 mr-2 rounded-full" 
            />
            <span className="text-white font-bold text-xl">Practo</span>
          </Link>
          <Link to="/home" className="text-white mr-4 hover:text-gray-200">Practo Home</Link>
          <Link to="/add-doctor" className="text-white mr-4 hover:text-gray-200">Add Doctor</Link>
          <Link to="/add-practice" className="text-white mr-4 hover:text-gray-200">Add Practice</Link>
        </div>
        <div>
          <Link to="/" className="text-white hover:text-gray-200">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
