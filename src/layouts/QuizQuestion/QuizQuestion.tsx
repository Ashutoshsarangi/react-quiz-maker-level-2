import React from "react";
import QuizBody from "../QuizBody/QuizBody";
import QuizForm from "../QuizForm/QuizForm";
import { useQuizContext } from "../../hooks/Quiz.hooks";

const QuizQuestion = () => {
  const {
    formValue,
    setFormValue,
    questions,
    response,
    submit,
    clickHandle,
    handleAnswerClick,
  } = useQuizContext();

  return (
    <>
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
    </>
  );
};

export default QuizQuestion;
