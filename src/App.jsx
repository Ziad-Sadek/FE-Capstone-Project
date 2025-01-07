import React, { useState } from 'react';
import fetchWeatherData from './weatherAPI'; // Import the function

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    const data = await fetchWeatherData(city);
    if (data) {
      setWeatherData(data);
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
