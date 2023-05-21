// import logo from './logo.svg';
import "./App.css";
import SearchWeather from "./components/SearchWeather";
import CurrentWeather from "./components/CurrentWeather";
import Header from "./components/Header";
import { Card} from "react-bootstrap";

function App() {
  return (
    <div className="app">
        <Header />
      <div className="container">
        <Card className="item">
          {" "}
          <CurrentWeather />{" "}
        </Card>
        <Card className="item">
          {" "}
          <SearchWeather />{" "}
        </Card>
      </div>
    </div>
  );
}

export default App;
