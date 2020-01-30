import React, { useEffect, useState } from "react";
import { getWeatherData } from "../modules/weather";

const Weather = () => {
  let [weatherDisplay, setWeatherDisplay] = useState("")
  let [gotWeather, setGotDisplay] = useState(false)

  const loadWeatherData = async () => {
    let weatherData = await getWeatherData();
    if (!weatherData.isAxiosError) {
      setWeatherDisplay(weatherData)
      setGotDisplay(true)
    } else {
      setWeatherDisplay("N/A")
    }
  }

  useEffect(() => {
    loadWeatherData()
  }, []);
  
  return (
      <>
        {gotWeather &&
        (<div>
          <p>{weatherDisplay.name}</p>
          <p>{weatherDisplay.main.temp}</p>
          <p>{weatherDisplay.main.feels_like}</p>
          <p>{weatherDisplay.sys.sunrise}</p> 
        </div>)}
      </>
  );
};

export default Weather;