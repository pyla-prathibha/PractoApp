import React, { useState } from 'react';
import PatientNavbar from './PatientNavbar';

function PracticeSearchPage() {
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
      const apiUrl = `http://localhost:8080/search/practices?query=${encodeURIComponent(query)}`;
      console.log('Calling API:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Search Practice</h2>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2">Search by Name or Specialty</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter practice name or specialty"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div>
          {results.length > 0 ? (
            results.map((practice) => (
              <div key={practice.id} className="border p-4 mb-4 rounded">
                <h3 className="text-xl font-bold">{practice.practiceName}</h3>
                <p><strong>Contact:</strong> {practice.contactNo}</p>
                <p><strong>Email:</strong> {practice.email}</p>
                <p>
                  <strong>Address:</strong> {practice.address}, {practice.city}, {practice.state}
                </p>
                <p>
                  <strong>Open Time:</strong> {practice.openTime} - {practice.closeTime}
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a href={practice.website} target="_blank" rel="noopener noreferrer">
                    {practice.website}
                  </a>
                </p>
                <p>
                  <strong>Specialties:</strong> {practice.specialties ? practice.specialties.join(', ') : 'N/A'}
                </p>
                <p><strong>Tag:</strong> {practice.tag}</p>
              </div>
            ))
          ) : (
            !loading && <p>No Practices found. Try searching with different criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PracticeSearchPage;
