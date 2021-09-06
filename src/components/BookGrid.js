import React from "react";
import Book from "./Book";

class BookGrid extends React.Component {
  render() {
    const { books, reshelveBooks, updateBook } = this.props;

    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book
              book={book}
              reshelveBooks={reshelveBooks}
              updateBook={updateBook}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default BookGrid;
