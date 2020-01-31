import React, { useEffect, useState } from "react";
import { getWeatherData } from "../modules/weather";
import { useTranslation } from 'react-i18next'

const Weather = () => {
  let [weatherDisplay, setWeatherDisplay] = useState("")
  let [coords, setCoords] = useState("")
  const { t } = useTranslation('common')

  const loadWeatherData = async () => {
    let weatherData = await getWeatherData(coords);
    if (!weatherData.isAxiosError) {
      setWeatherDisplay(weatherData)
    } else {
      setWeatherDisplay("Loading...")
    }
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setCoords([loc.coords.latitude, loc.coords.longitude])
    })
  }

  useEffect(() => {
    getLocation()
  }, []);

  useEffect(() => {
  loadWeatherData()
  }, [coords]);

  return (
      <div className="weatherMain">
        {weatherDisplay.name}
      </div>
  );
};

export default Weather;