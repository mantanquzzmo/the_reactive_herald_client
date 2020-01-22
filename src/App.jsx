import React from "react";
import DisplayCurrentArticle from "./components/DisplayCurrentArticle";
import DisplaySideArticles from "./components/DisplaySideArticles";
import Navbar from "./components/Navbar";
import { Header, Container, Grid } from "semantic-ui-react";
import Login from "./components/Login"
import Signup from "./components/Signup"

const App = () => {
  return (
    <Container>
      <Login />
      <Signup />
      <Header id="main-header">
        The Reactive Herald
      </Header>
      <Navbar />
      <Grid celled='internally'>
        <Grid.Column width={12}>
          <DisplayCurrentArticle />
        </Grid.Column>
        <Grid.Column width={4}>
          <DisplaySideArticles />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default App;
