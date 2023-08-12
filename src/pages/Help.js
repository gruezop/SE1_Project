import React, { useState } from 'react'
import questionList from './QuestionList'
import Question from './Question'

const Help = () => {
  const [questions, setQuestions] = useState(questionList)

  const toggleQuestion = index => {

    setQuestions(questions.map((question, i) => {
        if (i === index) {
          question.open = !question.open;
        } else {
          question.open = false;
        }
        return question;
      })
    );
  };

  return (
    
    <div>
      <div className="help">
        {questions.map((question, index) => (
          <Question 
          questions={question} 
          index={index} 
          key={index} 
          toggleQuestion={toggleQuestion} />
        ))}
      </div>
    </div>
  );
}

export default Help;