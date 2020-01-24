import axios from "axios";

const getOnThisDay = async () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(1);

  try {
    let response = await axios.get(
      `https://byabbe.se/on-this-day/${mm}/${dd}/events.json`
    );
    return response.data.events;
  } catch (error) {
    return error;
  }
};

export { getOnThisDay };
