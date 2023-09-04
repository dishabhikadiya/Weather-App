import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import "./Clock.js";

const App = () => {
  const [temperatureCelsius, setTemperatureCelsius] = useState("");
  const [temperatureFahrenheit, setTemperatureFahrenheit] = useState("");
  const [city, setCity] = useState("surat");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [windspeed, setWineSpeed] = useState("");
  const [wicon, setWicon] = useState("");
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };
  const getWeatherData = () => {
    axios({
      method: "GET",
      url: `http://localhost:4000/api?city=${city}`,
      // url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d370b56b2cd8d0f167b7cb624488f8c`,
    })
      .then((response) => {
        console.log("response", response);
        const celsiusTemp = Math.round(response.data.main.temp - 273.15);
        setTemperatureCelsius(celsiusTemp);
        setTemperatureFahrenheit(celsiusToFahrenheit(celsiusTemp));
        // setTemperature(Math.round(response.data.main.temp - 273.15));
        setDesc(response.data.weather[0].description);
        setName(response.data.name);
        setHumidity(response.data.main.humidity);
        setVisibility(response.data.visibility / 1000);
        setWineSpeed(response.data.wind.speed);
        setWicon(response.data.weather[0].icon);
        console.log(response);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div
      onLoad={() => {
        getWeatherData(city);
      }}
      className="background"
    >
      <div className="container">
        <form id="content" autoComplete="off">
          <input
            type="text"
            name="input"
            className="Search-box"
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
        <button
          className="searchbtn"
          onClick={() => {
            getWeatherData(city);
          }}
        >
          Search
        </button>
        <div id="card" className="weather">
          <div className="details">
            <div className="temp">
              {temperatureCelsius}&deg;c
              <span></span>
              <p></p>
              <span>{temperatureFahrenheit}&deg;F</span>
            </div>
            <div className="right">
              <div id="summary">{desc}</div>
              <div style={{ fontWeight: "bold", marginTop: "4px" }}>{name}</div>
            </div>
          </div>
          <img className="weatherimg" alt="image1" src={`${wicon}.svg`} />
          <div className="infos">
            <img
              alt="humidity1"
              className="humidityimg"
              style={{ width: "5", height: "5" }}
              src="humidity.svg"
            ></img>
            <div className="humidity">Humidity {humidity}%</div>
            <img
              alt="visibility1"
              className="visibilityimg"
              style={{ width: "5", height: "5" }}
              src="visibility.svg"
            ></img>
            <div className="visibility">Visibility {visibility} km</div>
            <img
              alt="windspeed1"
              className="windimg"
              style={{ width: "5", height: "5" }}
              src="wind.svg"
            ></img>
            <div className="windspeed">Wind Speed {windspeed} km</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
