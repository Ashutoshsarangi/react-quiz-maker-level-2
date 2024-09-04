import QuizForm from "../QuizForm/QuizForm";
import QuizBody from "../QuizBody/QuizBody";

const QuestionPanel = ({
  formValue,
  setFormValue,
  clickHandle,
  questions,
  handleAnswerClick,
  response,
  submit,
}) => {
  return (
    <div>
      <QuizForm
        formValue={formValue}
        setFormValue={setFormValue}
        clickHandle={clickHandle}
      />
      <QuizBody
        questions={questions}
        handleAnswerClick={handleAnswerClick}
        response={response}
        submit={submit}
      />
    </div>
  );
};

export default QuestionPanel;
