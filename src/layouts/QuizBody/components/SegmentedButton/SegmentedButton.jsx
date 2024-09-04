import parse from "html-react-parser";
import { getAppropriateClassName } from "../../../../utilities/Question.helpers";
import { ID_PREFIX } from "../../../../App.constants";
import "./SegmentedButton.css";

const SegmentedButton = ({ question, response, submit }) => {
  return (
    <>
      {question.renderOption.map((opt, index) => {
        const uniqueId = `${ID_PREFIX}_${question.id}_${index}`;
        return (
          <button
            key={opt}
            data-response={opt}
            data-response-id={uniqueId}
            id={uniqueId}
            className={`questionContainerOptions ${getAppropriateClassName(
              submit,
              response[question.id]?.[index],
              uniqueId
            )}`}
          >
            {parse(opt)}
          </button>
        );
      })}
    </>
  );
};

export default SegmentedButton;
