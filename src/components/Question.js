import React from 'react';

export default function Question(props) {
    console.log(props,'what is here handle submit?')

    const {question,answers} = props.text;
    return (
        <div className="card">
            <p> {props.text.question}</p>
                <select name="question">
                    <option value={answers[0]}>{answers[0]}</option>
                    <option value={answers[1]}>{answers[1]}</option>
                    <option value={answers[2]}>{answers[2]}</option>
                </select>
                <button onSubmit={ e => this.onSubmit}>Submit</button>    
        </div>
    );
};
