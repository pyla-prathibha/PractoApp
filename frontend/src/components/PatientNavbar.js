import React from 'react';
import { Link } from 'react-router-dom';

function PatientNavbar() {
  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Clickable logo redirecting to patient home page */}
          <Link to="/patient-home" className="flex items-center mr-6 hover:text-gray-200 transition">
            <img 
              src="/logo.png" 
              alt="Practo Logo" 
              className="w-10 h-10 mr-2 rounded-full" 
            />
            <span className="text-white font-bold text-xl">Practo</span>
          </Link>
          <Link to="/patient-home" className="text-white mr-4 hover:text-gray-200 transition">
            Practo Home
          </Link>
          <Link to="/doctor-search" className="text-white mr-4 hover:text-gray-200 transition">
            Find a Doctor
          </Link>
          <Link to="/practice-search" className="text-white mr-4 hover:text-gray-200 transition">
            Find a Practice
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white hover:text-gray-200 transition">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default PatientNavbar;
