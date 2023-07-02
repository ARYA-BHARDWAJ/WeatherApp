import SearchWeather from "./components/SearchWeather";
import DisplayWeatherWeather from "./components/DisplayWeather";
import React, { useState, useEffect } from "react";

const App = () => {
  //location
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //weather data
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // getting user location from geolocation api

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLatitude(latitude);
              setLongitude(longitude);
              
            },

            (error) => {
              setError(error.message);
            }
          );
        } else {
          setError("Geolocation is available.");
        }
      } catch (error) {
        setError("Failed to fetch weather data");
      }
    };
    getLocation();
  }, []);

  //fetching current  location weather
  useEffect(() => {
    const getWeatherdata = async () => {
      console.log(latitude, " ", longitude);
      console.log("API called");
      if (latitude && longitude) {
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        const forecastWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );

        const currentWeatherData = await currentWeatherResponse.json();

        const forecastWeatherData = await forecastWeatherResponse.json();

        setWeatherData(currentWeatherData);
        setForecastData(forecastWeatherData.list.slice(0, 7));
        console.log(currentWeatherData.name);
        console.log(forecastWeatherData.list[0].main.temp);
      }
    };
    getWeatherdata();
  }, [latitude, longitude]);

  const updateWeatherData = (weatherData, forecastData) => {
    setForecastData(forecastData);
    setWeatherData(weatherData);
  };

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.87)", minHeight: "100vh" }}>
      if(!error){
        error
      }
      <SearchWeather updateWeatherData={updateWeatherData} />
      {weatherData && forecastData ? (
        <DisplayWeatherWeather
          weatherData={weatherData}
          forecastData={forecastData}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
