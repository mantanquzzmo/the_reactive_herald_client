import React, { useEffect, useState } from "react";
import { getWeatherData } from "../modules/weather";
import { useTranslation } from 'react-i18next'

const Weather = () => {
  let [weatherDisplay, setWeatherDisplay] = useState("")
  let [gotWeather, setGotDisplay] = useState(false)
  const { t } = useTranslation('common')

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
  debugger
  return (
      <>
        {gotWeather &&
        (<div className="weatherMain">
          <p>{weatherDisplay.name}</p>
          <p>
            {t('weather.currently')}:
            {parseFloat(weatherDisplay.main.temp -273.15).toFixed(1)}&#8451;
          </p>
          <p>
            {t('weather.feelsLike')}: 
            {parseFloat(weatherDisplay.main.feels_like -273.15).toFixed(1)}&#8451;
          </p>
          <p>{weatherDisplay.weather[0].description}</p> 
        </div>)}
      </>
  );
};

export default Weather;