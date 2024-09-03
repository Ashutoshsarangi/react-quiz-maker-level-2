import { bool, object, func } from "prop-types";

const DropDown = ({ placeHolder, options, id }) => {
  return (
    <>
      <select id={id}>
        <option value="na">{placeHolder}</option>
        {options.map(({ id, name }) => (
          <option key={id}>{name}</option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
