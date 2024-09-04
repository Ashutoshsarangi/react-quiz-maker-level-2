import { useState } from "react";
import {
  handleOptionsForQuestion,
  updateResponseWithIds,
  getResultCount,
} from "../utilities/Question.helpers";
import { getQuestions } from "../utilities/Api.helpers";

export const useQuizMaker = () => {
  const [formValue, setFormValue] = useState({
    category: "na",
    difficulty: "na",
  });
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState({});
  const [submit, setSubmit] = useState(false);
  const [counter, setCounter] = useState(0);

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
    const questions = await getQuestions(formValue);
    const data = handleOptionsForQuestion(questions);

    setQuestions(data);
  };

  const handleAnswerClick = (e, question) => {
    console.log(e, question);

    setResponse((response) => ({
      ...response,
      ...updateResponseWithIds(question, e.target.dataset),
    }));
  };

  const submitResponseHandler = () => {
    setSubmit(true);
    console.log(response, questions);
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
