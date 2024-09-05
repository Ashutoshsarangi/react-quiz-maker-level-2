import React from "react";
import Header from "./layouts/Header/Header";
import { useQuizMaker } from "./hooks/App.hooks";
import QuizBody from "./layouts/QuizBody/QuizBody";
import QuizForm from "./layouts/QuizForm/QuizForm";
import Footer from "./layouts/Footer/Footer";
import "./App.css";
import { Outlet, useOutletContext } from "react-router";
import {
  FormValueInterface,
  QuestionInterface,
  ResponseInterface,
  QuizContextInterface,
} from "./App.interfaces";

function App() {
  const {
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
  } = useQuizMaker();

  return (
    <>
      <Header submit={submit} />
      <Outlet
        context={
          {
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
          } satisfies QuizContextInterface
        }
      />
      <Footer
        submit={submit}
        submitResponseHandler={submitResponseHandler}
        counter={counter}
        createNewQuizHandler={clearForm}
        responseLen={Object.keys(response).length}
      />
    </>
  );
}

export default App;
