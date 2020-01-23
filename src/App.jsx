import React from "react";
import DisplayCurrentArticle from "./components/DisplayCurrentArticle";
import DisplaySideArticles from "./components/DisplaySideArticles";
import Navbar from "./components/Navbar";
import { Header, Container, Grid } from "semantic-ui-react";
import Login from "./components/Login";
import CreateArticle from "./components/CreateArticle";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"

const App = props => {
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
                {props.userAttrs && props.userAttrs.role === 'journalist' ? (
                <Route exact path="/create-article" component={CreateArticle} />
                ) : <Redirect to="/" /> };
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

const mapStateToProps = state => {
  return {
    userAttrs: state.userAttrs
  };
};

export default connect(mapStateToProps)(App);
