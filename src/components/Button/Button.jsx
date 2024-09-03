const Button = ({ id, label, onClickHandler }) => {
  return (
    <>
      <button id={id} onClick={onClickHandler}>
        {label}
      </button>
    </>
  );
};

export default Button;
