import React, { useState } from 'react';
import './App.css';
import search_icon from "./assets/search.png";
import cloud_icon from "./assets/cloud.png";
import humidity_icon from "./assets/humidity.png";
import rain_icon from "./assets/rain.png";
import drizzle_icon from "./assets/drizzle.png";
import clear_icon from "./assets/clear.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";

function App() {
  const api_key = "29f3e615eeccaad4e3a9d460715b808a";
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.querySelector(".cityInput");
    if (!element.value) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();

    document.querySelector(".humidity-percent").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-rate").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + "°C";
    document.querySelector(".weather-location").innerHTML = data.name;

    switch (data.weather[0].icon) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        break;
      case "02d":
      case "02n":
        setWicon(cloud_icon);
        break;
      case "03d":
      case "03n":
        setWicon(drizzle_icon);
        break;
      case "04d":
      case "04n":
        setWicon(cloud_icon);
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        setWicon(rain_icon);
        break;
      case "13d":
      case "13n":
      default:
        setWicon(snow_icon);
        break;
    }
  };

  return (
    <div className='container'>
      <div className='left-part'>
        <h1>Weather App</h1>
        <div className='description'>
          <p>Get the latest weather updates for any city in the world.</p>
        </div>
      </div>
      <div className='right-part'>
        <div className='top-bar'>
          <input type='text' className='cityInput' placeholder='Search any city' />
          <div className='search-icon' onClick={search}>
            <img src={search_icon} alt='Search' />
          </div>
        </div>
        <div className='weather-details'>
          <div className='weather-image'>
            <img src={wicon} alt='Weather icon' />
          </div>
          <div className='weather-temp'>24°C</div>
          <div className="weather-location">London</div>
        </div>
        <div className='data-container'>
          <div className='element'>
            <img src={humidity_icon} alt='Humidity icon' className='icon' />
            <div className='data'>
              <div className='humidity-percent'>64%</div>
              <div className='text'>Humidity</div>
            </div>
          </div>
          <div className='element'>
            <img src={wind_icon} alt='Wind icon' className='icon' />
            <div className='data'>
              <div className='wind-rate'>18 km/h</div>
              <div className='text'>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
