import React from "react";
import DisplayCurrentArticle from "./components/DisplayCurrentArticle";
import DisplaySideArticles from "./components/DisplaySideArticles";
import Navbar from "./components/Navbar";
import { Header, Container, Grid } from "semantic-ui-react";
import Login from "./components/Login";
import CreateArticle from "./components/CreateArticle";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Container>
      <Login />
      <Header id="main-header">The Reactive Herald</Header>

      <BrowserRouter>
        <Navbar />
        <Grid celled="internally">
          <Grid.Column width={12}>
              <Switch>
                <Route exact path="/" component={DisplayCurrentArticle} />
                <Route exact path="/create-article" component={CreateArticle} />
              </Switch>
          </Grid.Column>
          <Grid.Column width={4}>
            <DisplaySideArticles />
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    </Container>
  );
};



export default App;
