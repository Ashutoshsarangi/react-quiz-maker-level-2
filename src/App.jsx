import { useState } from "react";
import Header from "./layouts/Header/Header";
import { getQuestions } from "./utilities/Api.helper";
import { handleOptionsForQuestion } from "./utilities/Question.helper";
import QuestionPanel from "./layouts/QuestionPanel/QuestionPanel";
import Footer from "./layouts/Footer/Footer";
import "./App.css";

function App() {
  const [formValue, setFormValue] = useState({
    category: "na",
    difficulty: "na",
  });
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState({});
  const [submit, setSubmit] = useState(false);
  const [counter, setCounter] = useState(0);

  const createNewQuizHandler = () => {
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
    const obj = {};
    obj[question.id] = [];
    for (let i = 0; i < question.renderOption.length; i++) {
      const temp = {
        correct_answer: question.correct_answer,
        correctAnswerId: `response_${question.id}_${
          question.renderOption[i] === question.correct_answer ? i : 23
        }`,
        user_answer: e.target.dataset.response,
        userAnswerId: e.target.dataset.responseId,
        activeId: e.target.id,
      };
      obj[question.id].push(temp);
    }
    setResponse((response) => ({ ...response, ...obj }));
  };

  const getResultCount = (response) => {
    let tempCounter = 0;
    for (let key in response) {
      const filter = response[key].filter(
        (data) => data.correctAnswerId === data.userAnswerId
      );
      if (filter.length) {
        tempCounter++;
      }
    }

    return tempCounter;
  };

  const submitResponseHandler = () => {
    setSubmit(true);
    console.log(response, questions);
    setCounter(getResultCount(response));
  };

  return (
    <>
      <Header submit={submit} />
      <QuestionPanel
        formValue={formValue}
        setFormValue={setFormValue}
        clickHandle={clickHandle}
        questions={questions}
        handleAnswerClick={handleAnswerClick}
        response={response}
        submit={submit}
      />
      <Footer
        submit={submit}
        submitResponseHandler={submitResponseHandler}
        counter={counter}
        createNewQuizHandler={createNewQuizHandler}
        responseLen={Object.keys(response).length}
      />
    </>
  );
}

export default App;
