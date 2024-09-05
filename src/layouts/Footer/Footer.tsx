import React from "react";
import { useNavigate } from "react-router-dom";
import { NO_OF_QUESTIONS } from "../../App.constants";
import "./Footer.css";

interface FooterProps {
  submit: boolean;
  submitResponseHandler: () => void;
  counter: number;
  createNewQuizHandler: () => void;
  responseLen: number;
}

const Footer = ({
  submit,
  submitResponseHandler,
  counter,
  createNewQuizHandler,
  responseLen,
}: FooterProps) => {
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    submitResponseHandler();
    navigate("/result");
  };

  const newQuizHandler = () => {
    createNewQuizHandler();
    navigate("/");
  };

  return (
    <>
      {responseLen === NO_OF_QUESTIONS && !submit && (
        <button
          onClick={handleSubmitClick}
          className="submit"
          data-testid="footerSubmitBtn"
        >
          Submit
        </button>
      )}
      {submit && (
        <>
          <p
            className={`result ${counter > 3 && "rightAnswer"} ${
              (counter > 1 || counter <= 3) && "warningAnswer"
            } ${counter <= 1 && "wrongAnswer"} `}
            data-testid="footerResult"
          >{`You Scored ${counter} out of ${NO_OF_QUESTIONS}`}</p>
          <button
            onClick={newQuizHandler}
            className="submit"
            data-testid="footerCreateNewQuiz"
          >
            Create a new Quiz
          </button>
        </>
      )}
    </>
  );
};

export default Footer;
