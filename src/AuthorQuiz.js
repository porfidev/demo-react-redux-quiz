import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

function Book({title}){
  return (
    <div className={'answer'}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({author, books}) {
  return (
    <div className={'row turn'} style={{backgroundColor: 'gray'}}>
      <div className={'col-4 offset-1'}>
        <img src={author.imageUrl} className={'authorimage'} alt={'Author'}/>
      </div>
      <div className={'col-6'}>
        {books.map((title, index) => <Book title={title} key={index} />)}
      </div>
    </div>
  );
}

function Continue() {
  return (
    <div></div>
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

function AuthorQuiz({turnData}) {
  return (
    <div className="container">
      <Hero/>
      <Turn {...turnData}/>
      <Continue/>
      <Footer/>
    </div>
  );

}

export default AuthorQuiz;
