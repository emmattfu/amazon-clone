import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import {Header} from "./Components"
import {Home, Login, Checkout, Orders, Payment} from "./Pages"
import { auth } from "./firebase";
import { setUser } from "./redux/actions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
            <Header />
            <Orders />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
