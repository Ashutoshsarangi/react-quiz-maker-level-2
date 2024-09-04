import { useState, useEffect } from "react";
import parse from "html-react-parser";

import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";
import { getAllCategory } from "../../utilities/Api.helper";
import "./QuizBody.css";

const QuizBody = ({ questions, handleAnswerClick, response, submit }) => {
  return (
    <div className="questionContainer">
      {console.log(questions)}
      {questions.map((question) => (
        <div key={question.id}>
          {parse(question.question)}
          <div onClick={(e) => handleAnswerClick(e, question)}>
            {question.renderOption.map((opt, index) => (
              <button
                key={opt}
                data-response={opt}
                data-response-id={`response_${question.id}_${index}`}
                data-correct-answer-id={
                  opt === question.correct_answer &&
                  `response_${question.id}_${index}`
                }
                id={`response_${question.id}_${index}`}
                className={`questionContainer__options ${
                  response[question.id]?.[index]?.activeId ===
                    `response_${question.id}_${index}` && "active"
                } ${
                  submit &&
                  response[question.id]?.[index]?.correctAnswerId ===
                    `response_${question.id}_${index}` &&
                  "active"
                } ${
                  submit &&
                  response[question.id]?.[index]?.userAnswerId ===
                    `response_${question.id}_${index}` &&
                  "wrong__answer"
                } ${
                  submit &&
                  response[question.id]?.[index]?.userAnswerId ===
                    response[question.id]?.[index]?.correctAnswerId &&
                  "right__answer"
                }`}
              >
                {parse(opt)}
              </button>
            ))}
          </div>
        </div>
      ))}
      {console.log(response)}
    </div>
  );
};

export default QuizBody;
