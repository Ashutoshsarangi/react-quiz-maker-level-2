import React from "react";
import parse from "html-react-parser";
import SegmentedButton from "./components/SegmentedButton/SegmentedButton";
import { QuestionInterface, ResponseInterface } from "../../App.interfaces";
import "./QuizBody.css";

interface QuizBodyProps {
  questions: Array<QuestionInterface>;
  handleAnswerClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    question: QuestionInterface
  ) => void;
  response: ResponseInterface;
  submit: boolean;
}

const QuizBody = ({
  questions,
  handleAnswerClick,
  response,
  submit,
}: QuizBodyProps) => {
  return (
    <div className="questionContainer">
      {questions.map((question, index) => (
        <div key={question.id}>
          {`${index + 1}. ${parse(question.question)}`}
          <div
            onClick={(e) => handleAnswerClick(e, question)}
            className="segmentedButtonContainer"
            data-testid="segmentedBtnDelegation"
          >
            <SegmentedButton
              question={question}
              response={response}
              submit={submit}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizBody;
