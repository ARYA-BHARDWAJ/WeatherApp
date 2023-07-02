import React from 'react';

const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast">
      <h2>7-Day Forecast</h2>
      <div className="forecast-cards">
        {forecastData.map((forecast, index) => (
          <div key={index} className="forecast-card">
            <h3>{forecast.dt_txt}</h3>
            <p>Temperature: {forecast.main.temp}</p>
            <p>Weather: {forecast.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="Weather Icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
