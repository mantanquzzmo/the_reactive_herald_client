import axios from "axios";

const getWeatherData = async () => {
  try {
    let token = "811885be91ed342c917e1667deb6f04b";
    let response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,se&APPID=${token}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getWeatherData };