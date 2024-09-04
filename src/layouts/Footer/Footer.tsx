import React from "react";
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
  return (
    <>
      {responseLen === NO_OF_QUESTIONS && !submit && (
        <button onClick={submitResponseHandler} className="submit">
          Submit
        </button>
      )}
      {submit && (
        <>
          <p
            className={`result ${counter >= 3 ? "rightAnswer" : "wrongAnswer"}`}
          >{`You Scored ${counter} out of ${NO_OF_QUESTIONS}`}</p>
          <button onClick={createNewQuizHandler} className="submit">
            Create a new Quiz
          </button>
        </>
      )}
    </>
  );
};

export default Footer;
