import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import BookIndex from "./components/BookIndex";
import BookSearch from "./components/BookSearch";

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <BookIndex />
            </Route>
            <Route>
              <BookSearch path="/search" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
