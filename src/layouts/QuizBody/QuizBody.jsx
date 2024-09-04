import parse from "html-react-parser";
import SegmentedButton from "./components/SegmentedButton/SegmentedButton";
import "./QuizBody.css";

const QuizBody = ({ questions, handleAnswerClick, response, submit }) => {
  return (
    <div className="questionContainer">
      {console.log(questions)}
      {questions.map((question) => (
        <div key={question.id}>
          {parse(question.question)}
          <div onClick={(e) => handleAnswerClick(e, question)}>
            <SegmentedButton
              question={question}
              response={response}
              submit={submit}
            />
          </div>
        </div>
      ))}
      {console.log(response)}
    </div>
  );
};

export default QuizBody;
