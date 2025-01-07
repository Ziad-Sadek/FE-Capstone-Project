import React, { useState } from 'react';
import fetchWeatherData from './weatherAPI.js';

const App = () => {
  // State variables
  const [city, setCity] = useState('');               
  const [weatherData, setWeatherData] = useState(null); 
  const [error, setError] = useState(null);            

  // Search handler
  const handleSearch = async () => {
    const data = await fetchWeatherData(city); 
    if (data) {
      setWeatherData(data);    
      setError(null);           
    } else {
      setError('City not found or network issue');
    }
  };

  return (
    <div>

      <input
        type="text"
        value={city} 
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />

      <button onClick={handleSearch}>Search</button>

      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default App;
