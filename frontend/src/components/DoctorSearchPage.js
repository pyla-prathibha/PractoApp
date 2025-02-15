import React, { useState } from 'react';
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
        headers: {
          'Content-Type': 'application/json'
        }
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
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Search Doctor</h2>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2">Search by Name or Specialty</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter doctor name or specialty"
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
            results.map((doctor) => (
              <div key={doctor.id} className="border p-4 mb-4 rounded">
                <h3 className="text-xl font-bold">{doctor.docName}</h3>
                <p>Email: {doctor.docEmail}</p>
                <p>Phone: {doctor.docPhoneNo}</p>
                <p>Experience: {doctor.experience} years</p>
                <p>
                  Consultation Fee: ₹{doctor.consultationFee}
                </p>
                <p>
                  Specialties:{" "}
                  {doctor.specialties ? doctor.specialties.join(", ") : "N/A"}
                </p>
                {doctor.qualifications && doctor.qualifications.length > 0 && (
                  <p>
                    Qualifications: {doctor.qualifications.join(", ")}
                  </p>
                )}
                {doctor.tag && <p>Tag: {doctor.tag}</p>}
                {doctor.practices && doctor.practices.length > 0 && (
                  <p>
                    Practices: {doctor.practices.join(", ")}
                  </p>
                )}
                {doctor.bio && <p>Bio: {doctor.bio}</p>}
              </div>
            ))
          ) : (
            <p>No doctors found. Try searching with different criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorSearchPage;
