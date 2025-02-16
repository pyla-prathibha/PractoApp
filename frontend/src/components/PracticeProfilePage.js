import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';

function PracticeProfilePage() {
  const { id } = useParams(); // Practice id from URL
  const [practice, setPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch practice details (assumed to include associated doctors if available)
  useEffect(() => {
    fetch(`http://localhost:8080/api/practices/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch practice data');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Practice data:", data);
        // Use data.practice if available; otherwise, use data directly.
        const practiceData = data.practice ? data.practice : data;
        setPractice(practiceData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Helper function to render specialties (array of objects or strings)
  const renderSpecialties = (specialties) => {
    if (!specialties || !Array.isArray(specialties)) return "N/A";
    return specialties
      .map(item => (typeof item === 'object' ? item.specName || item.name : item))
      .join(", ");
  };

  if (loading) return <p className="container mx-auto p-4 text-center">Loading...</p>;
  if (error) return <p className="container mx-auto p-4 text-red-500 text-center">{error}</p>;
  if (!practice) return <p className="container mx-auto p-4 text-center">No practice found.</p>;

  return (
    <div>
      <PatientNavbar />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-blue-600 p-6">
            <h1 className="text-4xl font-bold text-white">{practice.practiceName}</h1>
            <p className="text-blue-100 mt-1">Practice Profile</p>
          </div>
          {/* Details Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <p className="text-gray-700 text-lg">
                <strong>Email:</strong> {practice.email}
              </p>
              <p className="text-gray-700 text-lg mt-2">
                <strong>Phone:</strong> {practice.contactNo}
              </p>
              <p className="text-gray-700 text-lg mt-2">
                <strong>Specialties:</strong> {renderSpecialties(practice.specialties)}
              </p>
              <p className="text-gray-700 text-lg mt-2">
                <strong>Tag:</strong> {practice.tag && (typeof practice.tag === 'object' ? practice.tag.tagName : practice.tag)}
              </p>
            </div>
            {/* Right Column */}
            <div>
              <p className="text-gray-700 text-lg">
                <strong>Address:</strong> {practice.address}, {practice.city}, {practice.state}
              </p>
              <p className="text-gray-700 text-lg mt-2">
                <strong>Open Time:</strong> {practice.openTime} - {practice.closeTime}
              </p>
              <p className="text-gray-700 text-lg mt-2">
                <strong>Website:</strong>{" "}
                <a href={practice.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {practice.website}
                </a>
              </p>
            </div>
          </div>

          {/* Associated Doctors Section */}
          {practice.doctors && practice.doctors.length > 0 && (
            <div className="bg-blue-50 px-6 py-8">
              <h2 className="text-3xl font-bold text-blue-700 mb-6">Associated Doctors</h2>
              <div className="space-y-6">
                {practice.doctors.map((doc) => (
                  <div key={doc.id} className="border-t pt-4">
                    <h3 className="text-2xl font-bold text-blue-600">{doc.docName}</h3>
                    <p className="text-gray-700 text-lg"><strong>Email:</strong> {doc.docEmail}</p>
                    <p className="text-gray-700 text-lg"><strong>Phone:</strong> {doc.docPhoneNo}</p>
                    <p className="text-gray-700 text-lg"><strong>Experience:</strong> {doc.experience} years</p>
                    <p className="text-gray-700 text-lg"><strong>Consultation Fee:</strong> ₹{doc.consultationFee}</p>
                    <p className="text-gray-700 text-lg">
                      <strong>Specialties:</strong>{" "}
                      {doc.specialties && Array.isArray(doc.specialties)
                        ? doc.specialties.map(s => s.specName || s.name).join(", ")
                        : "N/A"}
                    </p>
                    {doc.qualifications && doc.qualifications.length > 0 && (
                      <p className="text-gray-700 text-lg">
                        <strong>Qualifications:</strong> {doc.qualifications.map(q => q.qualName || q.name).join(", ")}
                      </p>
                    )}
                    {doc.bio && (
                      <p className="text-gray-700 text-lg mt-2">
                        <strong>Bio:</strong> {doc.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="px-6 py-4 border-t">
            <Link to="/patient-home" className="text-blue-600 hover:underline font-semibold">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeProfilePage;
