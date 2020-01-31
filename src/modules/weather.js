import axios from "axios";

const getWeatherData = async (cords) => {
  try {
    let token = "811885be91ed342c917e1667deb6f04b";
    let response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${cords[0]}&lon=${cords[1]}&APPID=${token}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getWeatherData };