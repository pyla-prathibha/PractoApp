import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CreatableSelect from 'react-select/creatable';

function AddPracticePage() {
  const [practiceName, setPracticeName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [website, setWebsite] = useState('');
  
  // Specialties will be handled using react-select (CreatableSelect)
  const [specialties, setSpecialties] = useState([]); // Options from API (in {value, label} format)
  const [selectedSpecialties, setSelectedSpecialties] = useState([]); // Selected options
  
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState('');
  const [message, setMessage] = useState('');

  // Fetch Specialties and convert to react-select options
  useEffect(() => {
    fetch('http://localhost:8080/api/specialities')
      .then(res => res.json())
      .then(data => {
        const options = data.map(spec => ({
          value: spec.id,
          label: spec.specName   // Use specName from your JSON as the label
        }));
        setSpecialties(options);
      })
      .catch(err => console.error(err));
  }, []);

  // Fetch available Tags
  useEffect(() => {
    fetch('http://localhost:8080/api/tags')
      .then(res => res.json())
      .then(data => setTags(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const practiceData = {
      practiceName,
      contactNo,
      email,
      address,
      city,
      state,
      openTime,
      closeTime,
      website,
      // Convert selected specialties to an array of IDs (or new values if created)
      specialties: selectedSpecialties.map(option => option.value),
      tagId
    };

    try {
      const response = await fetch('http://localhost:8080/api/practices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(practiceData)
      });
      if (!response.ok) {
        throw new Error('Error adding practice');
      }
      await response.json();
      setMessage('Practice added successfully!');
      // Reset the form
      setPracticeName('');
      setContactNo('');
      setEmail('');
      setAddress('');
      setCity('');
      setState('');
      setOpenTime('');
      setCloseTime('');
      setWebsite('');
      setSelectedSpecialties([]);
      setTagId('');
    } catch (error) {
      console.error(error);
      setMessage('Error adding practice.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Add Practice</h2>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Practice Name</label>
            <input
              type="text"
              value={practiceName}
              onChange={(e) => setPracticeName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Contact No</label>
            <input
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Open Time</label>
            <input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Close Time</label>
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
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
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPracticePage;
