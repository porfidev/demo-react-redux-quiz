import * as PropTypes from 'prop-types';
import React, { Component } from 'react';

class AddAuthorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      bookTemp: ''
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  onFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddAuthor(this.state);
  }

  handleAddBook(e) {
    e.preventDefault();
    this.setState({
      books: [...this.state.books, this.state.bookTemp],
      bookTemp: ''
    });
  }

  render() {
    let {match} = this.props;
    return (
      <div>
        <h1>Add author</h1>
        {JSON.stringify(match)}
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor={'name'}>Nombre: </label>
            <input type={'text'} name={'name'} value={this.state.name} onChange={this.onFieldChange}/>
          </fieldset>
          <fieldset>
            <label htmlFor={'imageUrl'}>Url Imagen: </label>
            <input type={'text'} name={'imageUrl'} value={this.state.imageUrl} onChange={this.onFieldChange}/>
          </fieldset>
          <fieldset>
            <label htmlFor={'bookTemp'}>Libros: </label>
            {this.state.books.map((book, index) => <p key={index}>{book}</p>)}
            <input type={'text'} name={'bookTemp'} value={this.state.bookTemp} onChange={this.onFieldChange}/>
            <button onClick={this.handleAddBook}>Agregar +</button>
          </fieldset>
          <button>Agregar</button>
        </form>
      </div>
    );
  }
}

AddAuthorForm.propTypes = {match: PropTypes.any, onAddAuthor: PropTypes.func};

export default AddAuthorForm;
