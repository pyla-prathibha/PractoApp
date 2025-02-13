import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import AddPracticePage from './components/AddPracticePage';
import AddDoctorPage from './components/AddDoctorPage';

// Patient (search) pages:
import PatientHomePage from './components/PatientHomePage';
import DoctorSearchPage from './components/DoctorSearchPage';
import PracticeSearchPage from './components/PracticeSearchPage';

function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<LoginPage />} />

      {/* Provider routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-practice" element={<AddPracticePage />} />
      <Route path="/add-doctor" element={<AddDoctorPage />} />

      {/* Patient search routes */}
      <Route path="/patient-home" element={<PatientHomePage />} />
      <Route path="/doctor-search" element={<DoctorSearchPage />} />
      <Route path="/practice-search" element={<PracticeSearchPage />} />
    </Routes>
  );
}

export default App;
