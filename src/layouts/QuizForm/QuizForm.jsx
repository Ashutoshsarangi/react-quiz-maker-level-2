import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";
import { DIFFICULTY_OPTIONS } from "./QuizForm.constant";
import { getAllCategory } from "../../utilities/Api.helper";
import "./QuizForm.css";

const QuizForm = ({ formValue, setFormValue, clickHandle }) => {
  const [questionCategory, setQuestionCategory] = useState([]);

  useEffect(() => {
    (async () => {
      const getCategory = await getAllCategory();
      setQuestionCategory(getCategory);
    })();
  }, []);

  return (
    <div className="quizForm">
      {/* <DropDown
        placeHolder="Select a category"
        id="categorySelect"
        options={[
          { id: "a", name: "a" },
          { id: "b", name: "b" },
        ]}
      />
      <DropDown
        placeHolder="Select difficulty"
        id="difficultySelect"
        options={DIFFICULTY_OPTIONS}
      />
      <Button id="createBtn" label="Create" /> */}
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
    </div>
  );
};

export default QuizForm;
