import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useDispatch} from 'react-redux';

import Header from "./Components/Header";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import { auth } from "./firebase";
import "./App.css";
import { setUser } from "./redux/actions";
import Payment from "./Components/Payment";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user just loged in / he was loggen in
        dispatch(setUser(authUser))
      } else {
        // the user loged out
        dispatch(setUser(null))
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
            <Payment/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
