import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import CardGroup from "react-bootstrap/CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

const DisplayWeather = ({ weatherData, forecastData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  //dummy data
  // const forecastDataDummy = [
  //   { day: "Monday", temperature: "25°C", weather: "Sunny" },
  //   { day: "Tuesday", temperature: "22°C", weather: "Cloudy" },
  //   { day: "Wednesday", temperature: "20°C", weather: "Rainy" },
  //   { day: "Thursday", temperature: "23°C", weather: "Partly Cloudy" },
  //   { day: "Friday", temperature: "27°C", weather: "Sunny" },
  //   { day: "Saturday", temperature: "24°C", weather: "Sunny" },
  //   { day: "Sunday", temperature: "26°C", weather: "Partly Cloudy" },
  // ];

  const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayInAWeek = new Date().getDay() + 1;
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const directions = [
    "North",
    "North-Northeast",
    "Northeast",
    "East-Northeast",
    "East",
    "East-Southeast",
    "Southeast",
    "South-Southeast",
    "South",
    "South-Southwest",
    "Southwest",
    "West-Southwest",
    "West",
    "West-Northwest",
    "Northwest",
    "North-Northwest",
  ];

  //date and time
  useEffect(() => {
    // Update the current date and time every second
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      // Clear the timer when the component is unmounted
      clearInterval(timer);
    };
  }, []);

  const options = { hour: "numeric", minute: "numeric", second: "numeric" };
  const timeString = currentDate.toLocaleTimeString([], options);
  const dateString = currentDate.toLocaleDateString();

  return (
    <CardGroup>
      {weatherData && (
        <Card className="d-flex flex-row mx-4 my-5" text="white">
          <Card.Img
            src={`images/${weatherData.weather[0].icon}.jpeg`}
            alt="Card image"
          />
          <Card.ImgOverlay>
            <Card.Title className="text-center">{weatherData.name}</Card.Title>

            <Row>
              <Col xs={3} md={2}>
                <Card.Title>
                  <Image
                    src={`icons/${weatherData.weather[0].icon}.png`}
                    rounded
                    fluid
                  />
                </Card.Title>
              </Col>
              <Col>
                <Card.Title className="text-end">
                  {Math.round(weatherData.main.temp - 273.15)}
                  °C <br />
                  {weatherData.weather[0].description}
                </Card.Title>
              </Col>
            </Row>
          </Card.ImgOverlay>
        </Card>
      )}

      {/* // Card 2  for weather information and forecast data*/}
      {weatherData && (
        <Card className="d-flex flex-col mx-3 my-5" bg="dark" text="white">
          <Row>
            <Col>
              <ListGroup className="list-group-flush, text-center">
                <ListGroup.Item className="bg-black text-white">
                  Min : {Math.round(weatherData.main.temp_min - 273.15)}°C
                </ListGroup.Item>
                <ListGroup.Item className="bg-black text-white">
                  Humidity: {weatherData.main.humidity} %
                </ListGroup.Item>

                <ListGroup.Item className="bg-black text-white">
                  Wind: {Math.round(weatherData.wind.speed * 3.6)}km/h
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroup.Item className="bg-black text-white">
                  Max : {Math.round(weatherData.main.temp_max - 273.15)} °C
                </ListGroup.Item>
                <ListGroup.Item className="bg-black text-white">
                  Visibilty: {Math.round(weatherData.visibility / 1000)} km
                </ListGroup.Item>

                <ListGroup.Item className="bg-black text-white">
                  Wind Direction:{" "}
                  {directions[Math.round(weatherData.wind.deg / 22.5) % 16]}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          {/* weekely forecast data */}
          <Card.Subtitle className="text-center">
            {" "}
            <br /> Weekly forecast
          </Card.Subtitle>
          <Card.Body>
            <ListGroup horizontal style={{ overflowX: "auto", text:'white'}} >
              {forecastData.map((data, index) => (
                <ListGroup.Item key={index} className="bg-black text-white" >
                  <Image src={`icons/${data.weather[0].icon}.png`} fluid />
                  {forecastDays[index]} {Math.round(data.main.temp - 273.15)}°C
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
          <Card.Title className="text-center">
            {timeString}, {dateString}
          </Card.Title>
        </Card>
      )}
    </CardGroup>
  );
};

export default DisplayWeather;
