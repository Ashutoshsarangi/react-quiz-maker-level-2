import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";
import { DIFFICULTY_OPTIONS } from "./FormHandler.constant";
import "./FormHandler.css";

const FormHandler = (props) => {
  return (
    <div className="formHandler">
      <DropDown
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
      <Button id="createBtn" label="Create" />
    </div>
  );
};

export default FormHandler;
