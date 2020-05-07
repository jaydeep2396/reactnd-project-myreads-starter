import React from 'react'
import * as BooksAPI from '../BooksAPI'

const Book = props => {
  const { details, shelfBooks, onMoveBook } = props;
  // handling the change to shelf selection
  const handleChange = (event) => {
    details.shelf = event.target.value
    BooksAPI.update(details, event.target.value).then((res) => {
      onMoveBook(details)
    })
  }
  // adding current self for search results
  if (details.shelf === undefined) {
    for (let b of shelfBooks) {
      if (b.id === details.id)
        details.shelf = b.shelf
    }
  }
  return (
    <div>
      { // check for the thumbnails
        details.imageLinks !== undefined &&
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${details.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={details.shelf === undefined ? 'none' : details.shelf} onChange={handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{details.title}</div>
          {details.authors !== undefined && details.authors.map((author, index) => (
            <div key={index} className="book-authors">{author}</div>
          ))}
        </div>
      }
    </div>
  )
}

export default Book