import React from 'react';
import { Link } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';

function PatientHomePage() {
  return (
    <div>
      <PatientNavbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Practo Search</h1>
        <p>Find the best doctors and practices near you.</p>
        <div className="mt-8">
          <Link to="/doctor-search" className="bg-blue-600 text-white p-2 rounded mr-4 hover:bg-blue-700">
            Find a Doctor
          </Link>
          <Link to="/practice-search" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Find a Practice
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientHomePage;
