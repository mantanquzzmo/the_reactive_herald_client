import React, { useEffect, useState } from "react";
import { getWeatherData } from "../modules/weather";
import { useTranslation } from 'react-i18next'

const Weather = () => {
  let [weatherDisplay, setWeatherDisplay] = useState("")
  let [gotWeather, setGotDisplay] = useState(false)
  let [coords, setCoords] = useState("")
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

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setCoords([loc.coords.latitude, loc.coords.longitude])
    })
  }

  useEffect(() => {
    getLocation()
    loadWeatherData()
  }, []);
  
  return (
      <>
        {gotWeather &&
        (<div className="weatherMain">
          <p>
            {weatherDisplay.name}
            <br />
            {t('weather.currently')}:
            {parseFloat(weatherDisplay.main.temp -273.15).toFixed(1)}&#8451;
            <br />
            {t('weather.feelsLike')}:
            {parseFloat(weatherDisplay.main.feels_like -273.15).toFixed(1)}&#8451;
            <br />
            {weatherDisplay.weather[0].description}
            <br />
            {coords[0]}
          </p>
        </div>)}
      </>
  );
};

export default Weather;