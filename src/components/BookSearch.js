import React from "react";
import { Link } from "react-router-dom";
import BookGrid from "./BookGrid";
import * as BooksAPI from "../BooksAPI";

class BookSearch extends React.Component {
  state = {
    booksMap: {},
    results: []
  };

  async componentDidMount() {
    const shelvedBooks = await BooksAPI.getAll();
    const booksMap = this.hashBooks(shelvedBooks);

    this.setState({ booksMap });
  }

  hashBooks = books =>
    books.reduce((map, book) => ({ ...map, [book.id]: book }), {});

  unhashBooks = booksMap => Object.values(booksMap);

  updateBook = book => {
    const { booksMap, results } = this.state;
    const newBooksMap = { ...booksMap, [book.id]: book };
    this.setState(
      {
        booksMap: newBooksMap
      },
      () => {
        const newResults = this.mapBooks(results);

        this.setState({
          results: newResults
        });
      }
    );
  };

  mapBooks = books => {
    const { booksMap } = this.state;

    return books.map(book => ({
      ...book,
      shelf: booksMap[book.id] ? booksMap[book.id].shelf : "none"
    }));
  };

  search = async event => {
    const query = event.target.value;

    const response = await BooksAPI.search(query);

    const books = Array.isArray(response) ? response : [];

    const results = this.mapBooks(books);

    this.setState({ results });
  };

  render() {
    const { results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.search}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookGrid books={results} updateBook={this.updateBook} />
        </div>
      </div>
    );
  }
}

export default BookSearch;
