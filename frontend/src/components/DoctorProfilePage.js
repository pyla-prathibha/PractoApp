import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';

function DoctorProfilePage() {
  const { id } = useParams(); // doctor id from URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/doctors/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch doctor data');
        }
        return res.json();
      })
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="container mx-auto p-4">Loading...</p>;
  if (error) return <p className="container mx-auto p-4 text-red-500">{error}</p>;
  if (!doctor) return <p className="container mx-auto p-4">No doctor found.</p>;

  return (
    <div>
      <PatientNavbar />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row">
          {/* Left Column: Doctor Image */}
          <div className="md:w-1/3 flex justify-center items-center">
            <img 
              src={doctor.photo || "/placeholder-doctor.jpg"} 
              alt={doctor.docName} 
              className="w-48 h-48 object-cover rounded-full border-4 border-blue-600" 
            />
          </div>
          {/* Right Column: Doctor Details */}
          <div className="md:w-2/3 mt-8 md:mt-0 md:pl-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{doctor.docName}</h1>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Email:</strong> {doctor.docEmail}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Phone:</strong> {doctor.docPhoneNo}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Experience:</strong> {doctor.experience} years
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Specialties:</strong>{" "}
              {doctor.specialties && Array.isArray(doctor.specialties)
                ? doctor.specialties.map(s => s.specName || s.name).join(", ")
                : "N/A"}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Qualifications:</strong>{" "}
              {doctor.qualifications && Array.isArray(doctor.qualifications)
                ? doctor.qualifications.map(q => q.qualName || q.name).join(", ")
                : "N/A"}
            </p>
            {doctor.bio && (
              <p className="text-lg text-gray-600 mb-2">
                <strong>Bio:</strong> {doctor.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfilePage;
