import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';

Enzyme.configure({adapter: new Adapter});

// Dummie
const state = {
  turnData: {
    books: ['SomeBook', 'Dude', 'Foo', 'Bar'],
    author: {
      name: 'User a',
      imageUrl: 'images/test',
      imageSource: 'Wikimedia',
      books: ['TestbookA', 'TestbookB', 'TestboolC']
    }
  },
  hightlight: 'none'
};

describe('Author Quiz', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('When no answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>);
    });

    it('Should have not background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('');
    });
  });

  describe('When the wrong answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {hightlight: 'wrong'}))} onAnswerSelected={() => {}}/>);
    });

    it('Should have red color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
    });
  });

  describe('When the correct answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {hightlight: 'correct'}))}
                                  onAnswerSelected={() => {}}/>);
    });

    it('Should have red color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('green');
    });
  });

  describe('When the user select first answer', () => {
    let wrapper;
    const handler = jest.fn();
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handler}/>);
      wrapper.find('.answer').first().simulate('click');
    });

    it('should Call method', () => {
      expect(handler).toHaveBeenCalled();
    });

    it('should receive SomeBook option', () => {
      expect(handler).toHaveBeenCalledWith('SomeBook');
    });
  });
});

