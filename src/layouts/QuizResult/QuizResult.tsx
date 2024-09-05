import React from "react";
import QuizBody from "../QuizBody/QuizBody";
import { useQuizContext } from "../../hooks/Quiz.hooks";

const QuizResult = () => {
  const { questions, response } = useQuizContext();

  return <QuizBody questions={questions} response={response} submit />;
};

export default QuizResult;
