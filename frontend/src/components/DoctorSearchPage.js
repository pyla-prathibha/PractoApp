import React, { useState } from 'react';
import PatientNavbar from './PatientNavbar';

function DoctorSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // For demonstration, we simulate search results.
    // In a real app, call your backend API here with searchTerm and specialty.
    setResults([
      {
        docId: 1,
        docName: "Dr. John Doe",
        specialties: [{ id: 1, specName: "Cardiology" }],
        experience: 12,
        consultationFee: 150.0
      }
    ]);
  };

  return (
    <div>
      <PatientNavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Search Doctor</h2>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2">Doctor Name</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter doctor's name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Specialty</label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter specialty"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Search
          </button>
        </form>
        <div>
          {results.length > 0 ? (
            results.map((doctor) => (
              <div key={doctor.docId} className="border p-4 mb-4 rounded">
                <h3 className="text-xl font-bold">{doctor.docName}</h3>
                <p>Experience: {doctor.experience} years</p>
                <p>Consultation Fee: ${doctor.consultationFee}</p>
                <p>Specialties: {doctor.specialties.map(s => s.specName).join(', ')}</p>
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
