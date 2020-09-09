import React from "react";

import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Checkout from "./Components/Checkout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
