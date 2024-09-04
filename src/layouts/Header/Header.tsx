import React from "react";
import "./Header.css";

interface HeaderProps {
  submit: boolean;
}

const Header = ({ submit }: HeaderProps) => (
  <h1 className="header">{submit ? "RESULTS" : "QUIZ MAKER"}</h1>
);

export default Header;
