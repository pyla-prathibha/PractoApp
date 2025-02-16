import React, { useState } from 'react';
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
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Search Practice</h2>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2">Search by Name or Specialty</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter practice name or specialty..."
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div>
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.practice.id} className="border p-4 mb-4 rounded">
                <h3 className="text-xl font-bold">{result.practice.practiceName}</h3>
                <p>
                  <strong>Contact:</strong> {result.practice.contactNo}
                </p>
                <p>
                  <strong>Email:</strong> {result.practice.email}
                </p>
                <p>
                  <strong>Address:</strong> {result.practice.address}, {result.practice.city}, {result.practice.state}
                </p>
                <p>
                  <strong>Open Time:</strong> {result.practice.openTime} - {result.practice.closeTime}
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a href={result.practice.website} target="_blank" rel="noopener noreferrer">
                    {result.practice.website}
                  </a>
                </p>
                <p>
                  <strong>Specialties:</strong> {result.practice.specialties ? result.practice.specialties.join(', ') : 'N/A'}
                </p>
                <p>
                  <strong>Tag:</strong> {result.practice.tag}
                </p>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Doctors</h4>
                  {result.doctors && result.doctors.length > 0 ? (
                    result.doctors.map((doc) => (
                      <div key={doc.id} className="ml-4 border-l pl-2 mb-2">
                        <p>
                          <strong>Name:</strong> {doc.docName}
                        </p>
                        <p>
                          <strong>Email:</strong> {doc.docEmail}
                        </p>
                        <p>
                          <strong>Phone:</strong> {doc.docPhoneNo}
                        </p>
                        <p>
                          <strong>Experience:</strong> {doc.experience} years
                        </p>
                        <p>
                          <strong>Fee:</strong> ₹{doc.consultationFee}
                        </p>
                        <p>
                          <strong>Specialties:</strong>{' '}
                          {doc.specialties && Array.isArray(doc.specialties)
                            ? doc.specialties.map(s => s.specName || s.name).join(', ')
                            : 'N/A'}
                        </p>
                        {doc.qualifications && Array.isArray(doc.qualifications) && doc.qualifications.length > 0 && (
                          <p>
                            <strong>Qualifications:</strong>{' '}
                            {doc.qualifications.map(q => q.qualName || q.name).join(', ')}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="ml-4">No doctors available for this practice.</p>
                  )}
                </div>
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
