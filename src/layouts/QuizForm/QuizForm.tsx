import React from "react";
import { useState, useEffect } from "react";
import { DIFFICULTY_OPTIONS } from "./QuizForm.constant";
import { getAllCategory } from "../../utilities/Api.helpers";
import { FormValueInterface, CategoryInterface } from "../../App.interfaces";
import "./QuizForm.css";

interface QuizFormProps {
  formValue: FormValueInterface;
  setFormValue: React.Dispatch<React.SetStateAction<FormValueInterface>>;
  clickHandle: () => void;
  submit: boolean;
  clearForm: () => void;
}

const QuizForm = ({
  formValue,
  setFormValue,
  clickHandle,
  submit,
  clearForm,
}: QuizFormProps) => {
  const [questionCategory, setQuestionCategory] = useState<
    Array<CategoryInterface>
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const getCategory = await getAllCategory();
        setQuestionCategory(getCategory);
      } catch (error) {
        console.log(
          "Error happen while getting all Category information, ",
          error
        );
      }
    })();
  }, []);

  return (
    <div className="quizForm">
      <select
        value={formValue.category}
        id="categorySelect"
        onChange={(e) =>
          setFormValue((formValue: FormValueInterface) => ({
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
        id="difficultySelect"
        onChange={(e) =>
          setFormValue((formValue: FormValueInterface) => ({
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
      <button onClick={!submit ? clickHandle : clearForm} id="createBtn">
        {!submit ? "Create" : "Clear"}
      </button>
    </div>
  );
};

export default QuizForm;
