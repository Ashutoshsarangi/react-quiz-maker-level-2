import { NO_OF_QUESTIONS } from "../../App.constants";

const Footer = ({
  submit,
  submitResponseHandler,
  counter,
  createNewQuizHandler,
  responseLen,
}) => {
  return (
    <>
      {responseLen === NO_OF_QUESTIONS && !submit && (
        <button onClick={submitResponseHandler}>Submit</button>
      )}

      {submit && (
        <p
          className={`${counter >= 3 ? "right__answer" : "wrong__answer"}`}
        >{`You Scored ${counter} out of ${NO_OF_QUESTIONS}`}</p>
      )}
      {submit && (
        <button onClick={createNewQuizHandler}>Create a new Quiz</button>
      )}
    </>
  );
};

export default Footer;
