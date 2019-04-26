import React from 'react';
import Answer from './answer';

export default function Answer(props) {
    let choice = props.text.answers.map((elem,index) =>{
        <select>
            
        </select>
    })
    console.log(props,'props');
    return (
        <div className="card">
            Tabulating {props.text.question}
            {choice}
        </div>
    );
};
