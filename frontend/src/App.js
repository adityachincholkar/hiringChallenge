// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PropertyList from "./components/PropertyList";
import PropertyDetail from "./components/PropertyDetail";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/properties/:id" component={PropertyDetail} />
        <PrivateRoute path="/properties" component={PropertyList} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
