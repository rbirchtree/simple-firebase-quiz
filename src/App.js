import React from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './Quiz';
import firebase from './firebase';

const questions = [
  {
    question: 'Which of these numbers is prime?',
    answers: [
      {
        value: 42,
        count: 0
      },
      {
        value: 1337,
        count: 0
      },
      {
        value: 1,
        count: 0
      }
    ],
    id: 1,
  },
  {
    question: 'Which of these have won a World Series?',
    answers: [
      {
        value: "Cubs",
        count: 0
      },
      {
        value: "Rockies",
        count: 0
      },
      {
        value: "Rays",
        count: 0
      }
    ],
    id: 2,
  },
  {
    question: 'How many types of people are there?',
    answers: [
      {
        value: 10,
        count: 0
      },
      {
        value: 0,
        count: 0
      },
      {
        value: 1,
        count: 0
      },
      {
        value: "Those that know binary and those that don’t.",
        count: 0,
      }
    ],
    id: 3,
  },
  {
    question: 'The three most common errors in programming are...',
    answers: [
      {
        value: "Off by one error.",
        count: 0
      },
      {
        value: "Infinite loops.",
        count: 0
      },
      {
        value: "Typos",
        count: 0
      },
      {
        value: "All of the above",
        count: 0,
      }
    ],
    id: 4,

  }
];
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      questions: []
    }
    // firebase.database().ref('quiz').remove();
  }
  componentDidMount = () => {
    var database = firebase.database();
    var quizDatabase = database.ref('quiz');
    quizDatabase.on('value', (snapshot) => {
      if(!snapshot.val()){
         firebase.database().ref('quiz').set(questions);
         return;
      }
      this.setState({ questions: shuffle(snapshot.val())})
    });
  }
  updateThequestionCount(id){

  }
  render(){
    return (
      <div className="container">
      { this.state.questions.length === 0 ? <div className="lds-dual-ring"></div>
        :
        <Quiz questions = { this.state.questions }></Quiz>
      }
      </div>
    );
  }
    
}

export default App;