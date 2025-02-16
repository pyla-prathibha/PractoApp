import React from 'react';
import { Link } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';

function PatientHomePage() {
  return (
    <div>
      {/* Navbar */}
      <PatientNavbar />

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center" 
        style={{ backgroundImage: 'url(/banner.jpg)' }}
      >
        {/* Updated Gradient: From indigo-900 at the bottom to transparent at the top */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-80"></div> */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-800 to-transparent opacity-80"></div>

        <div className="relative container mx-auto py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            Welcome to Practo Search
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300">
            Find the best doctors and practices near you.
          </p>
          <div className="mt-8">
            <Link 
              to="/doctor-search" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 mr-4"
            >
              Find a Doctor
            </Link>
            <Link 
              to="/practice-search" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Find a Practice
            </Link>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Find a Doctor Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition duration-300">
            <img 
              src="/doc.jpg" 
              alt="Find a Doctor" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Find a Doctor</h3>
              <p className="text-gray-600 mb-4">
                Connect with experienced doctors in your area and book appointments easily.
              </p>
              <Link 
                to="/doctor-search" 
                className="text-blue-600 hover:underline font-semibold"
              >
                Explore Doctors →
              </Link>
            </div>
          </div>
          {/* Find a Practice Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition duration-300">
            <img 
              src="/prac.jpg" 
              alt="Find a Practice" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Find a Practice</h3>
              <p className="text-gray-600 mb-4">
                Discover trusted clinics and practices with comprehensive profiles.
              </p>
              <Link 
                to="/practice-search" 
                className="text-blue-600 hover:underline font-semibold"
              >
                Explore Practices →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Practo Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Practo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <img 
                src="/exp.jpg" 
                alt="Experienced Professionals" 
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Experienced Professionals</h3>
              <p className="text-gray-600">
                Connect with certified healthcare experts.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <img 
                src="/care.jpg" 
                alt="Quality Care" 
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Care</h3>
              <p className="text-gray-600">
                Receive top-notch care from trusted providers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <img 
                src="/sol.jpg" 
                alt="Innovative Solutions" 
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Innovative Solutions</h3>
              <p className="text-gray-600">
                Enjoy a seamless, user-friendly experience with our platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Patients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 italic mb-4">
              "Practo has completely changed how I connect with doctors. Booking appointments is now effortless!"
            </p>
            <h4 className="text-xl font-bold text-gray-800">- Emily R.</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 italic mb-4">
              "The platform is intuitive and reliable. I highly recommend Practo for quality healthcare."
            </p>
            <h4 className="text-xl font-bold text-gray-800">- Michael S.</h4>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 py-6">
        <div className="container mx-auto text-center text-white">
          <p className="mb-2">© {new Date().getFullYear()} Practo Search. All rights reserved.</p>
          <p className="text-sm">
            Follow us on 
            <a href="https://twitter.com" className="text-white ml-1 hover:underline">Twitter</a>, 
            <a href="https://facebook.com" className="text-white ml-1 hover:underline">Facebook</a>, and 
            <a href="https://instagram.com" className="text-white ml-1 hover:underline">Instagram</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PatientHomePage;
