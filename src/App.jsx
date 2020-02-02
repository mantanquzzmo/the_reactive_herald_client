import React from "react";
import { Header, Container } from "semantic-ui-react";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import DisplayNews from "./components/DisplayNews";
import DisplayProfile from "./components/DisplayProfile";
import AdminDashboard from "./components/admin/AdminDashboard";
import Signup from "./components/Signup"
import Footer from "./components/Footer"
import Weather from "./components/Weather";

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Login />
        <Weather />
        <Signup />
        <Header
          style={{
            fontSize: "55px",
            fontWeight: "normal",
          }}
          type="main-header"
          as={Link}
          to="/"
        >
          The Reactive Herald
        </Header>
        <Switch>
          <Route exact path="/" component={DisplayNews} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/profile" component={DisplayProfile} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;