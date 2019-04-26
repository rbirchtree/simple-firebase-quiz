import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
import Question from './components/Question';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'quiz',
      questionRendered : null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  componentDidMount() {
    const quiz = [{
      question: 'Which of these numbers is prime?',
      answers: [42,1337,1],
    },
    {
      question: 'Which of these have have won a World Series?',
      answers: ['Cubs', 'Rockies', 'Rays'],
    }];
    let questionRendered;
    if (Math.random() > .5){
      questionRendered = quiz[1];
    } else{
      questionRendered = quiz[0];
    }
    this.setState({
      questionRendered
    })
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }


  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  addedVote(vote){

  }

  render() {
      console.log(this.state)
      if (this.state.questionRendered === null){
        return (<h1>Loading...</h1>)
      } else{
        return (<Question onSubmit={this.handleSubmit} text={this.state.questionRendered}/>)
      }
  }
}
export default App;