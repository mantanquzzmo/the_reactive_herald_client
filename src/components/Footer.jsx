import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { getOnThisDay } from "../modules/footer";

const Footer = () => {
  let [thisDayEvent, setOnThisDayEvent] = useState("");
  let getOnThisDayData = async () => {
    const onThisDayData = await getOnThisDay();
    setOnThisDayEvent(
      onThisDayData[Math.floor(Math.random() * onThisDayData.length)]
    );
  };

  useEffect(() => {
    getOnThisDayData();
  }, []);

  return (
    <div id="footer">
      <Grid celled="internally">
        <Grid.Column width={8}>
          <div id="footer-onthisday">
            {thisDayEvent ? (
              <>
                <h5>On this day in {thisDayEvent.year}:</h5>
                <div> {thisDayEvent.description}</div>
              </>
            ) : (
              <p>hej</p>
            )}
          </div>
        </Grid.Column>
        <Grid.Column width={4}>
          <div id="footer 2">hej</div>
        </Grid.Column>
        <Grid.Column width={4}>
          <div id="footer 3">hej</div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Footer;
