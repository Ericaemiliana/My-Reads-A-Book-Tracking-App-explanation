import React from 'react'
import * as BooksAPI from './Utils/BooksAPI'
import './App.css'
import Shelf from "./components/Shelf"
import BookSearch from "./components/BookSearch"
import Book from "./components/Book"
import ListBook from './components/ListBook'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    Books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
    
  }

    componentDidMount() {
    this.fetch_books_details()

  }

  fetch_books_details = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({Books: books})
    })
  }

  update_books_details = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetch_books_details()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<ListBook books={this.state.Books} onChange={this.update_books_details}/>)}/>
        <Route exact path="/search" render={({history}) => (<BookSearch onChange={this.update_books_details} myBooks={this.state.Books}/>)}/>
      </div>
    )
  }
}
export default BooksApp
