import React, { useState } from 'react';
import PatientNavbar from './PatientNavbar';

function PracticeSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // For demonstration, simulate a result.
    // In a real app, call your backend API here with the searchTerm.
    setResults([
      {
        practiceId: 1,
        practiceName: "City Hospital",
        address: "123 Main Street",
        city: "Metropolis",
        state: "StateName"
      }
    ]);
  };

  return (
    <div>
      <PatientNavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Search Practice</h2>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2">Practice Name</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter practice name"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Search
          </button>
        </form>
        <div>
          {results.length > 0 ? (
            results.map((practice) => (
              <div key={practice.practiceId} className="border p-4 mb-4 rounded">
                <h3 className="text-xl font-bold">{practice.practiceName}</h3>
                <p>Address: {practice.address}</p>
                <p>{practice.city}, {practice.state}</p>
              </div>
            ))
          ) : (
            <p>No practices found. Try searching with different criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PracticeSearchPage;
