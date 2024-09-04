import "./Header.css";

const Header = ({ submit }) => {
  return <h1 className="header">{submit ? "RESULTS" : "QUIZ MAKER"}</h1>;
};

export default Header;
