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
      questionRendered : null,
      value: 'placeholder',
      items:null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.change = this.change.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  change(event){
    this.setState({value: event.currentTarget.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    let {value} =this.state;
    itemsRef.push(value);
    this.setState({
      value
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
    let RockiesVotes = 0;
    let RaysVotes = 0;
    let CubsVotes = 0;
    let vote1337 = 0;
    let vote42 = 0;
    let vote1 = 0;
    itemsRef.on('value', (snapshot) => {
      
      let items = snapshot.val();
      let newState = [];
      for (let item in items){
      
        if (items[item] === 'Rockies'){
          RockiesVotes++;
        }
        if (items[item] === 'Rays'){
          RaysVotes++;
        }
        if (items[item] === 'Cubs'){
          CubsVotes++;
        }
        if (items[item] == 1337){
          vote1337++;
        }
        if (items[item] == 42){
          vote42++;
        }
        if (items[item] == 1){
          vote1++;
        }
      }
      console.log(CubsVotes,'cubs')
      console.log(vote42,'votes');
      console.log(items,'items')
    });
  }


  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    console.log('this value', this.state.value);
      if (this.state.questionRendered === null){
        return (<h1>Loading...</h1>)
      } else{
        const {question, answers} = this.state.questionRendered;
        return (        
        <div className="card">
        <p> {question}</p>
          <form onSubmit={this.handleSubmit}>
            <select onChange={this.change} name="question">
                <option value={answers[0]}>{answers[0]}</option>
                <option value={answers[1]}>{answers[1]}</option>
                <option value={answers[2]}>{answers[2]}</option>
            </select>
            <button onSubmit={ e => this.onSubmit}>Submit</button>    
          </form>          
       </div>
    )
    }
  }
}
export default App;