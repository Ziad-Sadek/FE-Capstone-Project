import axios from 'axios';

const fetchWeatherData = async (city) => {
  const API_KEY = '05a2779da9d23113168ff7645473c4ef';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export default fetchWeatherData;
