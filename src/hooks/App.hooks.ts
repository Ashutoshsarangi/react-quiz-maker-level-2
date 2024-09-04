import { useState } from "react";
import {
  handleOptionsForQuestion,
  updateResponseWithIds,
  getResultCount,
} from "../utilities/Question.helpers";
import { getQuestions } from "../utilities/Api.helpers";
import {
  FormValueInterface,
  QuestionInterface,
  ResponseInterface,
} from "../App.interfaces";

export const useQuizMaker = () => {
  const [formValue, setFormValue] = useState<FormValueInterface>({
    category: "na",
    difficulty: "na",
  });
  const [questions, setQuestions] = useState<Array<QuestionInterface>>([]);
  const [response, setResponse] = useState<ResponseInterface>({});
  const [submit, setSubmit] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const clearForm = () => {
    setFormValue({ category: "na", difficulty: "na" });
    setQuestions([]);
    setResponse({});
    setSubmit(false);
    setCounter(0);
  };

  const clickHandle = async () => {
    if (formValue.category === "na" || formValue.difficulty === "na") {
      alert("Please select both the fields");
      return;
    }
    try {
      const questions = await getQuestions(formValue);
      const data = handleOptionsForQuestion(questions);

      setQuestions(data);
    } catch (error) {
      console.log(
        "Error happened, while getting Set Of Questions, please try again latter ",
        error
      );
    }
  };

  const handleAnswerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    question: QuestionInterface
  ) => {
    setResponse((response) => ({
      ...response,
      ...updateResponseWithIds(question, (e.target as HTMLDivElement)?.dataset),
    }));
  };

  const submitResponseHandler = () => {
    setSubmit(true);
    setCounter(getResultCount(response));
  };

  return {
    formValue,
    setFormValue,
    questions,
    response,
    submit,
    counter,
    clickHandle,
    submitResponseHandler,
    handleAnswerClick,
    clearForm,
  };
};
