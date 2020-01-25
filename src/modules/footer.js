import axios from "axios";

const getOnThisDay = async () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(1);

  try {
    let response = await axios.get(
      `https://byabbe.se/on-this-day/${mm}/${dd}/events.json`
    );
    let events = response.data.events;
    for (let i = events.length - 1; i >= 0; --i) {
      if (events[i].description.length < 115) {
        events.splice(i, 1);
      } else {
        if (events[i].description.length > 139) {
          events.splice(i, 1);
        }
      }
    }
    return events;
  } catch (error) {
    return error;
  }
};

export { getOnThisDay };
