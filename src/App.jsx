import React from "react";
import DisplayCurrentArticle from "./components/DisplayCurrentArticle";
import DisplaySideArticles from "./components/DisplaySideArticles";
import Navbar from "./components/Navbar";
import { Header, Container, Grid } from "semantic-ui-react";
import Login from "./components/Login";
import CreateArticle from "./components/CreateArticle";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import AdminDashboard from "./components/AdminDashboard";

const App = props => {
  return (
    <Container>
      <BrowserRouter>
        <Login />
        <Header id="main-header">The Reactive Herald</Header>
        <Switch>
          <Route exact path="/">
          <Navbar />
          <Grid celled="internally">
            <Grid.Column width={12}>
              <DisplayCurrentArticle />
            </Grid.Column>
            <Grid.Column width={4}>
              <DisplaySideArticles />
            </Grid.Column>
          </Grid>
          </Route>
          <Route exact path="/admin" component={AdminDashboard} />,
          {props.userAttrs && props.userAttrs.role === "journalist" &&
            <Route exact path="/admin/create-article" component={CreateArticle} />
          }
        </Switch>
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
