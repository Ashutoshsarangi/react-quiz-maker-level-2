const Header = ({ submit }) => {
  return (
    <div>
      <h1>{submit ? "RESULTS" : "QUIZ MAKER"}</h1>
    </div>
  );
};

export default Header;
