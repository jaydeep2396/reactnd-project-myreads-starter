import React from 'react'
import Book from './Book'

const BookShelf = props => {
  const { shelfName, booksList, onMoveBook } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksList.map((book) => (
            <li key={book.id}>
              <Book
                shelfBooks={booksList}
                onMoveBook={onMoveBook}
                details={book}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf