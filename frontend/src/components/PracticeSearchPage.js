import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';

function PracticeSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); // Each result: { practice: {...}, doctors: [...] }
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
      const apiUrl = `http://localhost:8080/search/practices?query=${encodeURIComponent(query)}`;
      console.log('Calling API:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch practices: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('API Response:', data);
      setResults(data);
    } catch (err) {
      console.error('Error fetching practices:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PatientNavbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-8">Search Practices</h2>
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter practice name or specialty..."
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
            results.map((result) => (
              <div key={result.practice.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                {/* Practice Name wrapped in a Link */}
                <Link to={`/practice-profile/${result.practice.id}`}>
                  <h3 className="text-2xl font-bold text-blue-600 mb-3 hover:underline">
                    {result.practice.practiceName}
                  </h3>
                </Link>
                <p className="text-gray-700"><strong>Contact:</strong> {result.practice.contactNo}</p>
                <p className="text-gray-700"><strong>Email:</strong> {result.practice.email}</p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {result.practice.address}, {result.practice.city}, {result.practice.state}
                </p>
                <p className="text-gray-700">
                  <strong>Open Time:</strong> {result.practice.openTime} - {result.practice.closeTime}
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong>{" "}
                  <a href={result.practice.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {result.practice.website}
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Specialties:</strong> {result.practice.specialties ? result.practice.specialties.join(', ') : 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Tag:</strong> {result.practice.tag}
                </p>
                {/* Associated Doctors Section */}
                <div className="mt-4">
                  <h4 className="text-xl font-semibold mb-2">Doctors</h4>
                  {result.doctors && result.doctors.length > 0 ? (
                    result.doctors.map((doc) => (
                      <div key={doc.id} className="ml-4 border-l pl-4 mb-3">
                        <p className="text-gray-800"><strong>Name:</strong> {doc.docName}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {doc.docEmail}</p>
                        <p className="text-gray-700"><strong>Phone:</strong> {doc.docPhoneNo}</p>
                        <p className="text-gray-700"><strong>Experience:</strong> {doc.experience} years</p>
                        <p className="text-gray-700"><strong>Fee:</strong> ₹{doc.consultationFee}</p>
                        <p className="text-gray-700">
                          <strong>Specialties:</strong>{" "}
                          {doc.specialties && Array.isArray(doc.specialties)
                            ? doc.specialties.map(s => s.specName || s.name).join(', ')
                            : 'N/A'}
                        </p>
                        {doc.qualifications && Array.isArray(doc.qualifications) && doc.qualifications.length > 0 && (
                          <p className="text-gray-700">
                            <strong>Qualifications:</strong> {doc.qualifications.map(q => q.qualName || q.name).join(', ')}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 ml-4">No doctors available for this practice.</p>
                  )}
                </div>
                <div className="mt-4">
                  <Link to={`/practice-profile/${result.practice.id}`} className="text-blue-600 hover:underline font-semibold">
                    View Profile →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="text-center col-span-full">No Practices found. Try searching with different criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PracticeSearchPage;
