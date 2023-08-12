import React from "react";


const Questions = ({ questions, index, toggleQuestion }) => {
  return (
    <div
      className={"questions " + (questions.open ? "open" : "")}
      key={index}
      onClick={() => toggleQuestion(index)}
    >
      <div className="questions-question">{questions.question}</div>
      <div className="questions-answer">{questions.answer}</div>
    </div>
  );
};

export default Questions;