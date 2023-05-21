// -----------------class-component-----------------------

// import React, { Component } from "react";

// class SearchWeather extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchQuery: "",
//       weatherData: null
//     };
//   }

//   handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${this.state.searchQuery}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
//       );
//       const data = await response.json();
//       this.setState({ weatherData: data });
//     } catch (error) {
//       console.log("Error fetching weather data:", error);
//     }
//   };

//   render() {
//     const { searchQuery, weatherData } = this.state;

//     return (
//       <div>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => this.setState({ searchQuery: e.target.value })}
//           placeholder="Enter city name"
//         />
//         <button onClick={this.handleSearch}>Search</button>

//         {weatherData && (
//           <div>
//             <h2>{weatherData.name}</h2>
//             <p>Temperature: {weatherData.main.temp} °C</p>
//             <p>Description: {weatherData.weather[0].description}</p>
//             <img src = 'http://openweathermap.org/img/w/${weatherData.weather[0]}'/>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default SearchWeather;

import React, { Component } from "react";

class SearchWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      weatherData: null,
      error: null
    };
  }

  handleClick = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.searchQuery}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      if(response.ok){

        const data = await response.json();
        this.setState({ weatherData: data , error:null});
      }
      
      else{
        throw new Error("City not found please enter valid city name")
      }
      
    } catch (error) {
      console.log("Error while fetching data form api ", error);
      this.setState({ error: error.message, weatherData: null });
    }
  };

  render() {
    const { error,searchQuery, weatherData } = this.state;
    return (
      <div>
        <input
          type="text"
          maxLength={100}
          value={searchQuery}
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
          placeholder="Enter city name"
          style={{ width: "85%"}}
        />

        <button onClick={this.handleClick}> Search </button>
        {error && <p style={{color:"red"}}>{error}</p>}
        {weatherData && (
          <div>
            <p> Weather in {weatherData.name} </p>
            <img
                  src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                  style={{ width: "100%", height: "100px" ,}}
                />
            <p> Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p> Humidity: {weatherData.main.humidity} </p>
            <p> Description: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default SearchWeather;
