// using class component only
import React from "react";
import { Navbar, Container, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { debounce } from "lodash";

class SearchWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      searchQuery: "",
      suggestions: [],
    };
    this.timer = null;
  }


  fetchAutocompleteSuggestions = async () => {
    try {
      const { searchQuery } = this.state;
      const response = await fetch(
        `https://${process.env.REACT_APP_RAPIDAPI_HOST}/v1/geo/cities?minPopulation=1000000&limit=5&namePrefix=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const suggestions = data.data.map((item) => ({
          id: `${item.latitude},${item.longitude}`,
          label: item.name,
        }));
        this.setState({ suggestions });
      } else {
        // Handle error case when the API request fails
        console.error(
          "Error fetching autocomplete suggestions:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  debouncedFetchAutocompleteSuggestions = debounce(
    this.fetchAutocompleteSuggestions,
    500 // Set the debounce delay in milliseconds
  );
  
  handleSearch = async (id) => {
    const [latitude, longitude] = id.split(",");
    console.log("Search query:", latitude, " ", longitude);
    if (this.state.searchQuery !== " ") {
      try {
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        const forecastWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        if (currentWeatherResponse.ok && forecastWeatherResponse.ok) {
          const currentWeatherData = await currentWeatherResponse.json();
          const forecastWeatherData = await forecastWeatherResponse.json();

          this.props.updateWeatherData(
            currentWeatherData,
            forecastWeatherData.list.slice(0, 7)
          );
        } else {
          throw new Error("City not found please enter valid city name");
        }
      } catch (error) {
        console.log("Error while fetching data form api ", error);
        this.setState({ error: error.message, weatherData: null });
      }
    }
  };

  handleInputChange = (input) => {
    clearTimeout(this.timer);
    this.setState({ searchQuery: input }, () => {
      if (input.length > 0) {
        this.debouncedFetchAutocompleteSuggestions();
      } else {
        this.setState({ suggestions: [] });
      }
    });
  };

  render() {
    const { searchQuery, suggestions } = this.state;
    console.log(process.env.REACT_APP_RAPIDAPI_HOST);
    return (
      <Navbar className="bg-dark">
        <Navbar.Brand
          className="text-center text-white"
          style={{ width: "100%" }}
          text="white"
        >
          {" "}
          Weather App{" "}
        </Navbar.Brand>
        <Container fluid>
          <Form style={{ width: "80%" }}>
            <Typeahead
              id="search-input"
              options={suggestions}
              placeholder="Search City here"
              className="me-2 "
              aria-label="Search"
              maxLength={100}
              value={searchQuery}
              onChange={(selected) => {
                if (selected && selected.length > 0) {
                  this.setState({ searchQuery: selected[0]?.label }, () => {
                    this.handleSearch(selected[0]?.id);
                  });
                } else {
                  this.setState({ searchQuery: "" });
                }
              }}
              onInputChange={this.handleInputChange}
            />
          </Form>
        </Container>
      </Navbar>
    );
  }
}

// class SearchWeather extends Component {
//   constructor(props) {
//     super(props);

//     //state of the component
//     this.state = {
//       searchQuery: "",
//       error: null,
//     };
//   }

//   //fetching weather data for current location
//   handleClick = async () => {
//     if (this.state.searchQuery != " ") {
//       try {
//         const currentWeatherResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${this.state.searchQuery}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
//         );
//         const forecastWeatherResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchQuery}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
//         );
//         if (currentWeatherResponse.ok && forecastWeatherResponse.ok) {
//           const currentWeatherData = await currentWeatherResponse.json();
//           const forecastWeatherData = await forecastWeatherResponse.json();

//           this.props.updateWeatherData(
//             currentWeatherData,
//             forecastWeatherData.list.slice(0, 7)
//           );
//         } else {
//           throw new Error("City not found please enter valid city name");
//         }
//       } catch (error) {
//         console.log("Error while fetching data form api ", error);
//         this.setState({ error: error.message, weatherData: null });
//       }
//     }
//   };

//   render() {
//     const { error, searchQuery, weatherData } = this.state;
//     // return (
//     //   <Navbar expand="lg" bg="dark" variant="dark">
//     //     <Container fluid>
//     //       <Form className="d-flex" style={{ width: "95%" }}>
//     //         <Form.Control
//     //           type="search"
//     //           placeholder="Search City here"
//     //           className="me-2"
//     //           aria-label="Search"
//     //           maxLength={100}
//     //           value={searchQuery}
//     //           onChange={(e) => this.setState({ searchQuery: e.target.value })}
//     //         />
//     //         <Button onClick={this.handleClick} variant="outline-success">
//     //           Search
//     //         </Button>
//     //       </Form>
//     //     </Container>
//     //   </Navbar>
//     // );
//     return (
//       <Navbar expand="lg" bg="dark" variant="dark">
//         <Container fluid>
//           <Typeahead
//             id="search-input"
//             options={[]}
//             placeholder="Search City here"
//             className="me-2"
//             aria-label="Search"
//             maxLength={100}
//             value={searchQuery}
//             onChange={(selected) => {
//               if (selected && selected.length > 0) {
//                 this.setState({ searchQuery: selected[0] });
//               } else {
//                 this.setState({ searchQuery: '' });
//               }
//             }}
//           />
//           <Button onClick={this.handleClick} variant="outline-success">
//             Search
//           </Button>
//         </Container>
//       </Navbar>
//     );
//   }
//   }

export default SearchWeather;
