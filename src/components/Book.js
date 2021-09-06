import React from "react";
import * as BooksAPI from "../BooksAPI";

class Book extends React.Component {
  constructor(props) {
    super(props);

    const { book } = props;

    this.state = {
      book
    };
  }

  changeShelf = async event => {
    const shelf = event.target.value;
    const { book } = this.state;
    const validShelves = new Set(["wantToRead", "currentlyReading", "read"]);

    if (!validShelves.has(shelf)) return;

    const newBook = { ...book, shelf };

    if (typeof this.props.updateBook === "function") {
      this.props.updateBook(newBook);
    }

    const newShelvesMap = await BooksAPI.update(book, shelf);

    this.setState({ book: newBook });

    if (typeof this.props.reshelveBooks === "function") {
      this.props.reshelveBooks(newShelvesMap);
    }
  };

  render() {
    const { book } = this.state;
    const { title, authors, shelf, imageLinks } = book;

    const defaultImage =
      "https://via.placeholder.com/128x193/fff/60ac5d?text=NO+COVER";

    const image = imageLinks ? imageLinks.thumbnail : defaultImage;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${image}")`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.changeShelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title || ""}</div>
        <div className="book-authors">{(authors || []).join(", ")}</div>
      </div>
    );
  }
}

export default Book;
