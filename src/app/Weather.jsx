import { useState } from 'react';
import react from react

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const apiKey = '8212f2ee733e67d9febf1dfe26b7cd3d';

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  const getWeather = () => {
    if (cityName === '') {
      alert('Please enter a city name.');
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod && data.cod !== 200) {
          alert('Error: ' + data.message);
        } else {
          setWeatherInfo(data);
        }
      })
      .catch((error) => {
        alert('Error, Invalid city name');
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-[#b8feff]">
        <div className="p-8 rounded shadow-xl bg-[#97f3f5] mx-3">
          <h1 className="text-2xl font-bold mb-4">Weather</h1>
          <div className="weather-container">
            <input
              type="text"
              id="cityInput"
              placeholder="Enter city"
              className="border p-2 mb-2 rounded"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              onKeyDown={handleEnterKey}
            />
            <button onClick={getWeather} className="bg-blue-500 text-white p-2 rounded">
              Enter
            </button>
            <div id="weatherInfo">
              {weatherInfo && weatherInfo.cod === 200 && (
                <>
                  <h2>{weatherInfo.name}</h2>
                  <p>Temperature: {weatherInfo.main.temp}°C</p>
                  <p>Description: {weatherInfo.weather[0].description}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
