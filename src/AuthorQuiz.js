import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Hero() {
  return (
    <div className={'row'}>
      <div className={'jumbotron col-10 offset-1'}>
        <h1>Author Quiz</h1>
        <p>Select a book written by author shown</p>
      </div>
    </div>
  );
}

function Book({title, onClickEvent}) {
  return (
    <div className={'answer'} onClick={() => {onClickEvent(title);}}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({author, books, hightlight, onAnswerSelected}) {
  const highlightToColoder = (hightlightSelected) => {
    const map = {
      none: '',
      correct: 'green',
      wrong: 'red'
    };
    return map[hightlightSelected];
  };
  return (
    <div className={'row turn'} style={{backgroundColor: highlightToColoder(hightlight)}}>
      <div className={'col-4 offset-1'}>
        <img src={author.imageUrl} className={'authorimage'} alt={'Author'}/>
      </div>
      <div className={'col-6'}>
        {books.map((title, index) => <Book title={title} key={index} onClickEvent={onAnswerSelected}/>)}
      </div>
    </div>
  );
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  hightlight: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

function Continue({ show, onContinue}) {
  return (
    <div>
      {show ? <button onClick={onContinue}>Continuar</button> : null}
    </div>
  );
}

function Footer() {
  return (
    <div id={'footer'} className={'row'}>
      <div className={'col-12'}>
        <p className={'text-muted credit'}>All images are registered.</p>
      </div>
    </div>
  );
}

function AuthorQuiz({turnData, hightlight, onAnswerSelected, onContinue}) {
  return (
    <div className="container">
      <Hero/>
      <Turn {...turnData} hightlight={hightlight} onAnswerSelected={onAnswerSelected}/>
      <Continue show={hightlight === 'correct'} onContinue={onContinue}/>
      <p><Link to={'/add'}>Agregar Author</Link></p>
      <Footer/>
    </div>
  );

}

export default AuthorQuiz;
