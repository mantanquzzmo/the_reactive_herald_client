import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { getOnThisDay, getForexData } from "../modules/footer";

const Footer = () => {
  let [thisDayEvent, setOnThisDayEvent] = useState("");
  let [forexDisplay, setForexDisplay] = useState("");

  let loadOnThisDayEvent = async () => {
    const onThisDayData = await getOnThisDay();
    setOnThisDayEvent(
      onThisDayData[Math.floor(Math.random() * onThisDayData.length)]
    );
  };

  const loadForexData = async () => {
    let forexData = await getForexData();
    if (forexData) {
      let forexSpecificData = [
        parseFloat(forexData.data.EUR).toFixed(2),
        Math.round(1 / forexData.data.BTC)
      ];
      setForexDisplay(forexSpecificData);
    }
  };

  useEffect(() => {
    loadOnThisDayEvent();
    loadForexData();
  }, []);

  return (
    <div id="footer">
      <Grid celled="internally">
        <Grid.Column width={5}>
          <div id="footer-info">
            <h5>Information: </h5>
            CEO and Editor in chief: Placeholder
            <br />
            Publishers: Placeholder
            <br />
            Visiting Address: Placeholder
          </div>
        </Grid.Column>
        <Grid.Column width={5}>
          <div id="footer-onthisday">
            {thisDayEvent ? (
              <>
                <h5>On this day in {thisDayEvent.year}:</h5>
                <div> {thisDayEvent.description}</div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </Grid.Column>
        <Grid.Column width={5}>
          <div id="footer-financials">
            {forexDisplay ? (
              <>
                <h5>Financials:</h5>
                <p>Dollar / Euro: {forexDisplay[0]}</p>
                <p>Bitcoin: {forexDisplay[1]} $</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Footer;