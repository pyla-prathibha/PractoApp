import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function HomePage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center" 
        style={{ backgroundImage: 'url(/banner.jpg)' }}
      >
        <div className="bg-black bg-opacity-60">
          <div className="container mx-auto py-20 text-center">
            <h1 className="text-5xl font-bold text-white">
              Welcome to Practo Portal
            </h1>
            <p className="text-xl text-gray-300 mt-4">
              Empowering doctors and practices to succeed.
            </p>
            <Link 
              to="/add-doctor" 
              className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Doctor Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src="/doctor.jpg" 
              alt="Add Doctor" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Add Doctor</h2>
              <p className="mb-4">
                Register a new doctor by providing their credentials and professional details.
              </p>
              <Link 
                to="/add-doctor" 
                className="text-blue-600 hover:underline font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
          {/* Add Practice Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src="/practice.jpg" 
              alt="Add Practice" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Add Practice</h2>
              <p className="mb-4">
                Add details of your practice or clinic, including location, services, and timings.
              </p>
              <Link 
                to="/add-practice" 
                className="text-blue-600 hover:underline font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 py-4">
        <div className="container mx-auto text-center text-white">
          © {new Date().getFullYear()} Practo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
