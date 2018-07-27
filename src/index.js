import sample from 'lodash/sample';
import shuffle from 'lodash/shuffle';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
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

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.hightlight = isCorrect ? 'correct' : 'wrong';
  masterRender();
}

function resetState() {
  return {
    turnData: getTurnData(authors),
    hightlight: 'wrong'
  };
}

let state = resetState();

function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}
                     onContinue={() => {
                       state = resetState();
                       masterRender();
                     }}/>;
}

const AddAuthorFromWrapper = withRouter(({history}) => {
  return <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }}/>;
});

function masterRender() {
  ReactDOM.render(<BrowserRouter>
    <React.Fragment>
      <Route exact path={'/'} component={App}/>
      <Route path={'/add'} component={AddAuthorFromWrapper}/>
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
}

masterRender();
registerServiceWorker();
