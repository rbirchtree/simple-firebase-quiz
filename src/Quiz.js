import React from 'react';
import Question from './Question';
import './Quiz.css';
import firebase from './firebase';

export default class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState = () => {
        return {
            questions: this.props.questions,
            quizStarted: false,
            currentQuestionId: this.props.questions[0].id,
            answerSelected: null,
            questionIndex: 1,
        }
    }
    startQuiz = () =>{
        this.setState({ quizStarted: true })
    }
    getQuestion = (id) => this.props.questions.find((question) => {
            return question.id === id;
        })
    nextQuestion = () =>{
        if(!this.state.answerSelected){
            return;
        }
        let nextQuestionId = 0;
        this.state.questions.forEach( ( question, key) => {
            if(question.id === this.state.currentQuestionId){
                nextQuestionId = this.state.questions[key+1].id;
            }
        });
        this.setState((prevState) => ({
            currentQuestionId: nextQuestionId,
            answerSelected: null,
            questionIndex: prevState.questionIndex+1
        })); 
    }
    doneQuiz = () => {
        if(!this.state.answerSelected){
            return;
        }
        alert('Thanks for participating!!!');
        this.setState(this.getInitialState());
    }
    submitAnswer = (questionId, answerSelected) =>{
        if(this.state.answerSelected){
            return;
        }
        const databaseRef = firebase.database().ref('quiz').child(questionId - 1).child('answers'); // Id + 1 = index in firebase database
        databaseRef.transaction(function(answers) {
        answers = answers.map( answer => {
                if(answer.value === answerSelected.value){
                    answer.count  = answer.count + 1;
                }
                return answer;
            })
        return answers;
        });
        this.setState({ answerSelected})
        
    }
    render() {
      const totalQuestions = this.state.questions.length;
      return(
        <div>
            {
               !this.state.quizStarted  ? <div className="start">
                    <div className="start-title"><span>Simple Quiz by Rob</span></div>
                    <button className="get-started btn" onClick={ this.startQuiz}>get started</button>
                </div>
                : 
                <div className="question-container">
                    {
                    <Question
                        question = { this.getQuestion(this.state.currentQuestionId)}
                        questionIndex = {this.state.questionIndex}
                        totalQuestions = {totalQuestions}
                        answerSelected = {this.state.answerSelected}
                        submitAnswer = { this.submitAnswer} />
                    }
                    { totalQuestions > this.state.questionIndex ?
                        <button className={`btn ${this.state.answerSelected ? '': 'disabled'}`} onClick={ this.nextQuestion}>Next > </button>
                        :
                        <button className={`btn ${this.state.answerSelected ? '': 'disabled'}`}  onClick={ this.doneQuiz}>Done </button> 
                        }
                </div>
            }
        </div>
      )
    }
  }