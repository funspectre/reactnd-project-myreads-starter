import React from "react";
import BookGrid from "./BookGrid";

class BookShelf extends React.Component {
  render() {
    const { title, books, reshelveBooks, updateBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BookGrid
            books={books}
            reshelveBooks={reshelveBooks}
            updateBook={updateBook}
          />
        </div>
      </div>
    );
  }
}

export default BookShelf;
