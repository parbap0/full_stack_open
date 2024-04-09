import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

const WeatherReport = ({city}) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    // console.log(apiKey)
    const [weather, setWeather] = useState([]);
  
    useEffect(() => {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }, []);
  
    return (
      <>
        {weather.current ? (
          <div>
            <h2>Weather in {city}</h2>
            <div>Temperature {weather.current.temp_c}°C</div>
            <img
              alt="weather icon"
              src={weather.current.condition.icon}
            />
            <div>Wind {weather.current.wind_kph} kph</div>
          </div>
        ) : null}
      </>
    );
}

export default WeatherReport