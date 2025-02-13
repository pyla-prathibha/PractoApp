import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-blue-600 w-full p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-white mr-2">
          <img 
            src="/logo.png" 
            alt="Practo Logo" 
            className="w-full h-full object-cover" 
          />
        </div>
        <span className="text-white font-bold text-xl">Practo</span>
      </div>
      <div>
        <Link 
          to="/patient-home" 
          className="px-4 py-2 border border-white rounded text-white font-semibold transition hover:bg-white hover:text-blue-600"
        >
          Find Care
        </Link>
      </div>
    </nav>
  );
}

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        navigate('/home');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: 'url(/1.jpg)' }}
    >
      {/* Overlay for improved readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />
        
        {/* Login Form centered on the page */}
        <div className="flex items-center justify-center min-h-screen px-4">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Provider Login</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            
            <div className="mb-4">
              <label className="block mb-2 text-blue-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-blue-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 text-blue-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-blue-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Login as Provider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
