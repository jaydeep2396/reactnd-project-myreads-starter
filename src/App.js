import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchBook from './components/SearchBook'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  constructor(props) {
    super(props)
    this.selves = [{ id: 'currentlyReading', name: 'Currently Reading' },
                    { id: 'wantToRead', name: 'Want to Read' },
                    { id: 'read', name: 'Read' }]
  }

  // moves book between shelves and also from search-results to shelf
  moveBook = (bookToBeMoved) => {
    this.setState(currentState => ({
      books: currentState.books.filter(b => b.id !== bookToBeMoved.id).concat(bookToBeMoved)
    }))
  }

  // fetching all the books for shelf
  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBook onMoveBook={this.moveBook} shelfBooks={this.state.books} />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.selves.map((shelf) => (
                  <BookShelf
                    key={shelf.id}
                    shelfID={shelf.id}
                    shelfName={shelf.name}
                    onMoveBook={this.moveBook}
                    booksList={books.filter((book) => book.shelf === shelf.id)}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
