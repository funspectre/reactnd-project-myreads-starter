import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import * as BooksAPI from "../BooksAPI";

class BookIndex extends React.Component {
  state = {
    books: [],
    booksMap: {},
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  hashBooks = books =>
    books.reduce((map, book) => ({ ...map, [book.id]: book }), {});

  unhashBooks = booksMap => Object.values(booksMap);

  shelveBooks = books => {
    const shelves = {};
    for (const book of books) {
      const { shelf } = book;
      shelves[shelf] = shelves[shelf] ? [...shelves[shelf], book] : [book];
    }

    return shelves;
  };

  updateBook = book => {
    const { booksMap } = this.state;
    const newBooksMap = { ...booksMap, [book.id]: book };
    const books = this.unhashBooks(newBooksMap);
    const shelves = this.shelveBooks(books);
    this.setState({
      shelves
    });
  };

  reshelveBooks = shelvesMap => {
    const { booksMap } = this.state;

    let newShelves = {};

    for (const shelf in shelvesMap) {
      newShelves[shelf] = shelvesMap[shelf].map(bookId => ({
        ...booksMap[bookId],
        shelf
      }));
    }

    this.setState({
      shelves: newShelves
    });
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    const shelves = this.shelveBooks(books);
    const booksMap = this.hashBooks(books);

    this.setState({
      books,
      booksMap,
      shelves
    });

    console.log({ books, shelves });
  }

  render() {
    const { shelves } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={shelves.currentlyReading}
              reshelveBooks={this.reshelveBooks}
              updateBook={this.updateBook}
            />
            <BookShelf
              title="Want to Read"
              books={shelves.wantToRead}
              reshelveBooks={this.reshelveBooks}
              updateBook={this.updateBook}
            />
            <BookShelf
              title="Read"
              books={shelves.read}
              reshelveBooks={this.reshelveBooks}
              updateBook={this.updateBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BookIndex;
