import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import Orders from "./Components/Orders"
import { auth } from "./firebase";
import "./App.css";
import { setUser } from "./redux/actions";
import Payment from "./Components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const dispatch = useDispatch();
  const promise = loadStripe(
    "pk_test_51HT0EgLDM9Q25ThyjCBaTAINwQfteCxJ9K2xGq4OPqz7WSlV9LdEI7BUxEhj7h6NhcPkNkZyBmYgnWJOR9Az5PAF00bjNslFw8"
  );

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user just loged in / he was loggen in
        dispatch(setUser(authUser));
      } else {
        // the user loged out
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact route="/orders">
            <Orders />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
