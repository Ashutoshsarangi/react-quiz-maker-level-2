import React from "react";
import Header from "./layouts/Header/Header";
import { useQuizMaker } from "./hooks/App.hooks";
import QuizBody from "./layouts/QuizBody/QuizBody";
import QuizForm from "./layouts/QuizForm/QuizForm";
import Footer from "./layouts/Footer/Footer";
import "./App.css";

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
      <div>
        <QuizForm
          formValue={formValue}
          setFormValue={setFormValue}
          clickHandle={clickHandle}
          submit={submit}
          clearForm={clearForm}
        />
        <QuizBody
          questions={questions}
          handleAnswerClick={handleAnswerClick}
          response={response}
          submit={submit}
        />
      </div>
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
