import React, { useState } from 'react';
import fetchWeatherData from './weatherAPI.js';
import { FaSearch } from 'react-icons/fa'; 
import './App.css';





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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="body">
      <div className="background"></div>

      <div className="weather-card">
        <h1>Weather Dashboard</h1>

        
        <div className="flex mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        
        {loading && <p className="loading">Loading...</p>}

        
        {error && <div className="error-message">{error}</div>}

        
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            
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
