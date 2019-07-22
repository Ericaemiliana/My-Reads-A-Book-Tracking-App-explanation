import React, {Component} from "react";
import {Link} from 'react-router-dom'
import Book from './Book'
import {PropTypes} from 'prop-types'
import * as BooksAPI from '../Utils/BooksAPI'
//import * as BooksAPI from './Utils/BooksAPI'

class BookSearch extends Component {
  state = {
    Books: [],
    query: ''
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired
  }

  handleChange = (event) => {
    var value = event.target.value
    this.setState(() => {
      return {query: value}
    })
    this.search_books(value)
  }

  changeBookShelf = (books) => {
    let all_Books = this.props.myBooks
    for (let book of books) {
      book.shelf = "none"
    }

    for (let book of books) {
      for (let b of all_Books) {
        if (b.id === book.id) {
          book.shelf = b.shelf
        }
      }
    }
    return books
  }

  search_books = (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 10).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books = this.changeBookShelf(books)
          this.setState(() => {
            return {Books: books}
          })
        }
      })
    } else {
      this.setState({Books: [], query: ''})
    }
  }

  add_book = (book, shelf) => {
    this.props.onChange(book, shelf)
  }

	render(){
    	return(<div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				{this.state.query.length > 0 && this.state.Books.map((book, index) => (<Book book={book} key={index} onUpdate={(shelf) => {
              this.add_book(book, shelf)
            }}/>))}
			</ol>
            </div>
          </div>)}}

export default BookSearch;