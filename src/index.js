import sample from 'lodash/sample';
import shuffle from 'lodash/shuffle';
import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import AddAuthorForm from './AddAuthorForm';
import AuthorQuiz from './AuthorQuiz';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg',
    imageSource: 'Wikimedia',
    books: ['The Adventures of Huckleberry Finn', 'Test A', 'Test B', 'Test C']
  },
  {
    name: 'Back Ammon',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg',
    imageSource: 'Wikimedia',
    books: ['Test A', 'Test B', 'Test C', 'Never Play AS it']
  },
  {
    name: 'Michael Bay',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg',
    imageSource: 'Wikimedia',
    books: ['This is Sparta', 'Test A', 'Test B', 'Test C']
  },
  {
    name: 'Ludwing Van Retobarimon',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg',
    imageSource: 'Wikimedia',
    books: ['Test A', 'Soy un Libro', 'Test C', 'Test D']
  }
];

// Redux 02
function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, action) {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some(book => book === action.answer);
      state.highlight = isCorrect ? 'correct' : 'wrong';
      return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'});
    case 'CONTINUE':
      return Object.assign({}, state, {highlight: '', turnData: getTurnData(state.authors)});
    case 'ADD_AUTHOR':
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      });
    default:
      return state;
  }
}

// Redux 01
let store = Redux.createStore(reducer);

function getTurnData(authors) {
  const books = authors.reduce((previous, current) => {
    return previous.concat(current.books);
  }, []);
  const random = shuffle(books).slice(0, 4);
  const answer = sample(random);

  return {
    books: random,
    author: authors.find(author => author.books.some(title => title === answer))
  };
}

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path={'/'} component={AuthorQuiz}/>
        <Route path={'/add'} component={AddAuthorForm}/>
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
