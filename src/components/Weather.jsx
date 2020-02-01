import React, { useEffect, useState } from "react";
import { getWeatherData } from "../modules/weather";
import { useTranslation } from 'react-i18next'

const Weather = () => {
  let [weatherError, setWeatherError] = useState("")
  let [gotWeather, setGotWeather] = useState(false)
  let [coords, setCoords] = useState("")
  let [temp, setTemp] = useState("")
  let [place, setPlace] = useState("")
  let [description, setDescription] = useState("")
  const { t } = useTranslation('common')

  const loadWeatherData = async () => {
    let weatherData = await getWeatherData(coords);
    if (!weatherData.isAxiosError) {
      setPlace(weatherData.name)
      setTemp(parseFloat(weatherData.main.temp - 273.15).toFixed(1))
      setDescription(weatherData.weather[0].description)
      setGotWeather(true)
    } else {
      setWeatherError("Loading...")
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
        {gotWeather ? (
          <p>
            {place}
            <br/>
            {t('weather.currently')}:
            {temp}&#8451;
            <br/>
            {description}
          </p>
        ) : (
          <p>{weatherError}</p>
        )}
      </div>
  );
};

export default Weather;