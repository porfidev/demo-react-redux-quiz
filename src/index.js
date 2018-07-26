import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import shuffle from 'lodash/shuffle';
import sample from 'lodash/sample';

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
  },
];

function getTurnData(authors){
  const books = authors.reduce((previous, current) => {
    return previous.concat(current.books);
  }, []);
  const random = shuffle(books).slice(0,4);
  const answer = sample(random);

  return {
    books: random,
    author: authors.find(author => author.books.some(title => title === answer)),
  }
}

const state = {
  turnData: getTurnData(authors),
};

ReactDOM.render(<AuthorQuiz {...state} />, document.getElementById('root'));
registerServiceWorker();
