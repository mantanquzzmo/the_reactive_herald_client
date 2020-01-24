import React from "react";
import { Header, Container } from "semantic-ui-react";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DisplayNews from "./components/DisplayNews"
import DisplayProfile from "./components/DisplayProfile"
import AdminDashboard from "./components/admin/AdminDashboard";
import Signup from "./components/Signup"
import Footer from "./components/Footer"


const App = () => {
  return (
    <Container>

      <BrowserRouter>
        <Login />
        <Signup />
        <Header id="main-header" href="/">The Reactive Herald</Header>
          <Switch>
            <Route exact path="/" component={DisplayNews} />
            <Route exact path="/admin" component={AdminDashboard} />
            <Route exact path="/profile" component={DisplayProfile} />
          </Switch>
        </BrowserRouter>
        
        <Footer />

    </Container>
  );
};

export default App;
