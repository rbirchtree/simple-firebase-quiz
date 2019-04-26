import React from 'react';

const Question = (props) =>{
    const {question: {question, answers, id, count}, questionIndex, answerSelected, totalQuestions, submitAnswer } = props;
    return (
        <>
        <div className="cancel"><i className="fas fa-times-circle icon"></i></div>
        <div className="question">{ question}</div>
        { answers.map(( singleAnswer, key) => {
            return (
                <div key={singleAnswer.value}
                    className="answer"
                    onClick={() => {
                        submitAnswer(id, singleAnswer)
                    }}
                    >
                    <span className="sub-text">{answerSelected && answerSelected.value === singleAnswer.value ? '(Your Answer)': ''}</span>
                    {singleAnswer.value}
                    <span className="sub-text">{ answerSelected ? `People Selected: ${singleAnswer.count}`: ''}</span>
                </div>
            )
        })}
        <div className="questions">{`${questionIndex}/${totalQuestions}`}</div>
        </>
    )
}

export default Question;