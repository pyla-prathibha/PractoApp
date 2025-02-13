import React from 'react';
import { Link } from 'react-router-dom';

function PatientNavbar() {
  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/doctor-search" className="text-white mr-4">Find a Doctor</Link>
          <Link to="/practice-search" className="text-white mr-4">Find a Practice</Link>
        </div>
        <div>
          <Link to="/" className="text-white">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default PatientNavbar;
