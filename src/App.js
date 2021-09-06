import React from "react";
import "./App.css";
import BookIndex from "./components/BookIndex";
import BookSearch from "./components/BookSearch";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  showSearchPage = () => this.setState({ showSearchPage: true });
  hideSearchPage = () => this.setState({ showSearchPage: false });

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch closeSearch={this.hideSearchPage} />
        ) : (
          <BookIndex openSearch={this.showSearchPage} />
        )}
      </div>
    );
  }
}

export default BooksApp;
