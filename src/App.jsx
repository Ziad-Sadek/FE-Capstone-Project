import React, { useState } from 'react';
import fetchWeatherData from './weatherAPI.js';
import { FaSearch } from 'react-icons/fa'; // Importing a search icon

const App = () => {
  // State variables
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search handler
  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchWeatherData(city);
    setLoading(false);

    if (data) {
      setWeatherData(data);
      setError(null);
    } else {
      setError('City not found or network issue');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">Weather Dashboard</h1>

        {/* Search Input and Button */}
        <div className="flex mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
          >
            <FaSearch />
          </button>
        </div>

        {/* Loading indicator */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500 mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-blue-600">{weatherData.name}</h2>
            <div className="text-xl text-gray-700 mt-4">
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} km/h</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
