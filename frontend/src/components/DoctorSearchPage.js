import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';

function DoctorSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `http://localhost:8080/search/doctors?query=${encodeURIComponent(query)}`;
      console.log('Calling API:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('API Response:', data);
      setResults(data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PatientNavbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-6">Search Doctors</h2>
        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-10">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or specialty..."
              className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-4 rounded-r-lg hover:bg-blue-700 transition duration-300"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-center">Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.length > 0 ? (
            results.map((doctor) => (
              <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <Link to={`/doctor-profile/${doctor.id}`}>
                  <h3 className="text-2xl font-bold text-blue-600 mb-2 hover:underline">
                    {doctor.docName}
                  </h3>
                </Link>
                <p className="text-gray-700"><strong>Email:</strong> {doctor.docEmail}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {doctor.docPhoneNo}</p>
                <p className="text-gray-700"><strong>Experience:</strong> {doctor.experience} years</p>
                <p className="text-gray-700"><strong>Consultation Fee:</strong> ₹{doctor.consultationFee}</p>
                <p className="text-gray-700">
                  <strong>Specialties:</strong> {doctor.specialties ? doctor.specialties.join(", ") : "N/A"}
                </p>
                {doctor.qualifications && doctor.qualifications.length > 0 && (
                  <p className="text-gray-700">
                    <strong>Qualifications:</strong> {doctor.qualifications.join(", ")}
                  </p>
                )}
                {doctor.tag && <p className="text-gray-700"><strong>Tag:</strong> {doctor.tag}</p>}
                {doctor.practices && doctor.practices.length > 0 && (
                  <p className="text-gray-700"><strong>Practices:</strong> {doctor.practices.join(", ")}</p>
                )}
                {doctor.bio && <p className="text-gray-700 mt-2"><strong>Bio:</strong> {doctor.bio}</p>}
                <div className="mt-4">
                  <Link to={`/doctor-profile/${doctor.id}`} className="text-blue-600 font-semibold hover:underline">
                    View Profile →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="text-center col-span-full">No doctors found. Try searching with different criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorSearchPage;
