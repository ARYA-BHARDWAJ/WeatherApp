import React, { useState, useEffect } from "react";
import "./style.css";

const CurrentWeather = () => {
  // const [weatherData, setWeatherData] = useState({
  //   name: "San Francisco",
  //   main: { temp: 17, humidity: 75 },
  //   weather: [{ description: "Cloudy" }]
  // });

  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    //Getting user current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      console.log("waiting for api res");
    }
  }, []);

  useEffect(() => {
    // fetcihing weather data from API
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      console.log("sending request");
      const data = await response.json();
      setWeatherData(data);
    };
    fetchWeatherData();
  }, [location]);

  return (
    weatherData && (
      <>
        <p style={{ textAlign: "center" }}> CurrentWeather</p>
        <p>
          Current Weather in <b>{weatherData.name}</b>
        </p>

        <img
          src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          alt="Weather Icon"
          style={{ align: "center", width: "100%", height: "100px" }}
        />
        <center>
          {" "}
          <b>{weatherData.weather[0].description}</b>
        </center>
        <p>Temperature: {weatherData.main.temp} °C</p>
        <p>Humidity: {weatherData.main.humidity}%</p> 
        <p>Date : {currentTime.toLocaleDateString()}   &nbsp;&nbsp;&nbsp; Time: ({currentTime.toLocaleTimeString()}) </p>
        
          
          
        
      </>
    )
  );
};

export default CurrentWeather;

// style={{textAlign: "right"}}
// style={{textAlign: "right"}}
// style={{textAlign: "right"}}
