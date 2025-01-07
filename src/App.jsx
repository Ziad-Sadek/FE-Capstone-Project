import React, { useState } from 'react';
import fetchWeatherData from './weatherAPI.js';
import { FaSearch } from 'react-icons/fa';

const App = () => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


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
    <div className="body">
      <div className="background"></div>

      <div className="weather-card">
        <h1>Weather Dashboard</h1>

        {/* Search Input and Button */}
        <div className="flex mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        {/* Loading indicator */}
        {loading && <p className="loading">Loading...</p>}

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Weather Data */}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            {/* Weather Icon */}
            {weatherData.weather && (
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
            )}
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
