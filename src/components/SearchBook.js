import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import { debounce } from 'lodash'

class SearchBook extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchedBooks: [],
      searchError: false
    }
  }

  // Debounce improves the performance and makes less request to server.
  handleChange = debounce((query) => {
    this.setState({query})
    if (query.trim()) {
      BooksAPI.search(query.trim())
        .then((searchedBooks) => {
          searchedBooks.length > 0 ? this.setState({ searchedBooks , searchError: false}) : this.setState({ searchedBooks: [] , searchError: true})
        })
    } else {
      this.setState({ searchedBooks: [], searchError: false})
    }
  }, 1000)

  render(){
    const {searchedBooks, searchError} = this.state
    const {onMoveBook, shelfBooks} = this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={(e) => this.handleChange(e.target.value)} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map((book) => (
              <li key={book.id}>
                <Book
                  shelfBooks={shelfBooks}
                  details={book}
                  onMoveBook={onMoveBook}
                />
              </li>
            ))}
          </ol>
          {searchError && <h3>No books found! Try again</h3>}
        </div>
      </div>
    )
  }
}

export default SearchBook