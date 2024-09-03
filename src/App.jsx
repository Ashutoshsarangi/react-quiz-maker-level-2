import { useState, useEffect, Fragment } from "react";
import parse from "html-react-parser";
import Header from "./components/Header/Header";
import { getAllCategory, getQuestions } from "./utilities/ApiHelper";
import { handleOptionsForQuestion } from "./utilities/QuestionHandler";
import FormHandler from "./layouts/FormHandler/FormHandler";
import QuestionPanel from "./layouts/QuestionPanel/QuestionPanel";
import "./App.css";

const DIFFICULTY_OPTIONS = [
  { id: "easy", name: "Easy" },
  { id: "medium", name: "Medium" },
  { id: "hard", name: "Hard" },
];

const NO_OF_QUESTIONS = 5;

function App() {
  const [questionCategory, setQuestionCategory] = useState([]);
  const [formValue, setFormValue] = useState({
    category: "na",
    difficulty: "na",
  });
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState({});
  const [submit, setSubmit] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    (async () => {
      const getCategory = await getAllCategory();
      setQuestionCategory(getCategory);
    })();
  }, []);

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
    // setResponse((response) => ({
    //   ...response,
    //   ...{
    //     easy_0: {
    //       ...response["easy_0"],
    //       activeId: "response_easy_0_1",
    //     },
    //   },
    // }));
  };

  return (
    <>
      {/* <Header />
      <FormHandler />
      <QuestionPanel /> */}
      <h1>{submit ? "RESULTS" : "QUIZ MAKER"}</h1>
      <select
        value={formValue.category}
        onChange={(e) =>
          setFormValue((formValue) => ({
            ...formValue,
            category: e.target.value,
          }))
        }
      >
        <option value="na">Select a category</option>
        {questionCategory.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <select
        value={formValue.difficulty}
        onChange={(e) =>
          setFormValue((formValue) => ({
            ...formValue,
            difficulty: e.target.value,
          }))
        }
      >
        <option value="na">Select difficulty</option>
        {DIFFICULTY_OPTIONS.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <button onClick={clickHandle}>create</button>
      <div className="questionContainer">
        {console.log(questions)}
        {questions.map((question) => (
          <div key={question.id}>
            {parse(question.question)}
            <div onClick={(e) => handleAnswerClick(e, question)}>
              {question.renderOption.map((opt, index) => (
                <button
                  key={opt}
                  data-response={opt}
                  data-response-id={`response_${question.id}_${index}`}
                  data-correct-answer-id={
                    opt === question.correct_answer &&
                    `response_${question.id}_${index}`
                  }
                  id={`response_${question.id}_${index}`}
                  className={`questionContainer__options ${
                    response[question.id]?.[index]?.activeId ===
                      `response_${question.id}_${index}` && "active"
                  } ${
                    submit &&
                    response[question.id]?.[index]?.correctAnswerId ===
                      `response_${question.id}_${index}` &&
                    "active"
                  } ${
                    submit &&
                    response[question.id]?.[index]?.userAnswerId ===
                      `response_${question.id}_${index}` &&
                    "wrong__answer"
                  } ${
                    submit &&
                    response[question.id]?.[index]?.userAnswerId ===
                      response[question.id]?.[index]?.correctAnswerId &&
                    "right__answer"
                  }`}
                >
                  {parse(opt)}
                </button>
              ))}
            </div>
          </div>
        ))}
        {console.log(response)}
      </div>

      {Object.keys(response).length === NO_OF_QUESTIONS && !submit && (
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
}

export default App;
