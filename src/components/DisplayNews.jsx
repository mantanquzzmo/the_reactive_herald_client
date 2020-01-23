import React from "react";
import Navbar from "./Navbar"
import DisplayCurrentArticle from "./DisplayCurrentArticle"
import DisplaySideArticles from "./DisplaySideArticles"
import { Grid } from "semantic-ui-react";

const DisplayNews = () => {
  return (
    <>
      <Navbar />
      <Grid celled="internally">
        <Grid.Column width={12}>
          <DisplayCurrentArticle />
        </Grid.Column>
        <Grid.Column width={4}>
          <DisplaySideArticles />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default DisplayNews;
