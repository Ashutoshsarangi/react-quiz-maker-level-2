import parse from "html-react-parser";
import { getAppropriateClassName } from "../../../../utilities/Question.helpers";
import { ID_PREFIX } from "../../../../App.constants";

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
            className={`questionContainer__options ${getAppropriateClassName(
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
