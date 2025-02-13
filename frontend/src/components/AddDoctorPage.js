import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

function AddDoctorPage() {
  // Basic doctor info
  const [docName, setDocName] = useState('');
  const [docEmail, setDocEmail] = useState('');
  const [docPhoneNo, setDocPhoneNo] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [consultationFee, setConsultationFee] = useState('');
  const [tagId, setTagId] = useState('');

  // Multi-select state arrays (using react-select's format: { value, label })
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [practices, setPractices] = useState([]);
  const [selectedPractices, setSelectedPractices] = useState([]);
  const [tags, setTags] = useState([]);
  
  const [message, setMessage] = useState('');

  // Fetch Tags
  useEffect(() => {
    fetch('http://localhost:8080/api/tags')
      .then(res => res.json())
      .then(data => setTags(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch Specialties and convert to react-select options
  useEffect(() => {
    fetch('http://localhost:8080/api/specialities')
      .then(res => res.json())
      .then(data => {
        const options = data.map(spec => ({
          value: spec.id,
          label: spec.specName  // Display specName as the label
        }));
        setSpecialties(options);
      })
      .catch(err => console.error(err));
  }, []);

  // Fetch Qualifications and convert to react-select options
  useEffect(() => {
    fetch('http://localhost:8080/api/qualifications')
      .then(res => res.json())
      .then(data => {
        const options = data.map(qual => ({
          value: qual.id,
          label: qual.qualName  // Display qualName as the label
        }));
        setQualifications(options);
      })
      .catch(err => console.error(err));
  }, []);

  // Fetch Practices and convert to react-select options
  useEffect(() => {
    fetch('http://localhost:8080/api/practices')
      .then(res => res.json())
      .then(data => {
        const options = data.map(practice => ({
          value: practice.practiceId,
          label: practice.practiceName
        }));
        setPractices(options);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert react-select selections to arrays of values
    const doctorData = {
      docName,
      docEmail,
      docPhoneNo,
      experience: parseInt(experience),
      bio,
      consultationFee: parseFloat(consultationFee),
      tagId,
      specialtyIds: selectedSpecialties.map(option => option.value),
      qualificationIds: selectedQualifications.map(option => option.value),
      practiceIds: selectedPractices.map(option => option.value)
    };

    try {
      const response = await fetch('http://localhost:8080/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorData)
      });
      if (!response.ok) {
        throw new Error('Error adding doctor');
      }
      await response.json();
      setMessage('Doctor added successfully!');
      // Reset the form fields
      setDocName('');
      setDocEmail('');
      setDocPhoneNo('');
      setExperience('');
      setBio('');
      setConsultationFee('');
      setTagId('');
      setSelectedSpecialties([]);
      setSelectedQualifications([]);
      setSelectedPractices([]);
    } catch (error) {
      console.error(error);
      setMessage('Error adding doctor.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Add Doctor</h2>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Basic Details */}
          <div>
            <label className="block mb-1">Doctor Name</label>
            <input
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={docEmail}
              onChange={(e) => setDocEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Phone No</label>
            <input
              type="text"
              value={docPhoneNo}
              onChange={(e) => setDocPhoneNo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Experience (years)</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Consultation Fee</label>
            <input
              type="number"
              step="0.01"
              value={consultationFee}
              onChange={(e) => setConsultationFee(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Tag</label>
            <select
              value={tagId}
              onChange={(e) => setTagId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Tag</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.tagName}
                </option>
              ))}
            </select>
          </div>

          {/* Specialties (Creatable Multi-Select) */}
          <div>
            <label className="block mb-1">Specialties</label>
            <CreatableSelect
              isMulti
              options={specialties}
              value={selectedSpecialties}
              onChange={setSelectedSpecialties}
              placeholder="Select or add specialties..."
            />
          </div>

          {/* Qualifications (Creatable Multi-Select) */}
          <div>
            <label className="block mb-1">Qualifications</label>
            <CreatableSelect
              isMulti
              options={qualifications}
              value={selectedQualifications}
              onChange={setSelectedQualifications}
              placeholder="Select or add qualifications..."
            />
          </div>

          {/* Practices (Standard Multi-Select with Add Link) */}
          <div>
            <label className="block mb-1">Practices</label>
            <Select
              isMulti
              options={practices}
              value={selectedPractices}
              onChange={setSelectedPractices}
              placeholder="Select practices..."
            />
            <p className="mt-2 text-red-600">
  Practice not listed? <Link to="/add-practice" className="underline text-red-600">Add a practice first</Link>
</p>

          </div>

          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctorPage;
