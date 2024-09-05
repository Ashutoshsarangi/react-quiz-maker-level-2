import React from "react";
import { useOutletContext } from "react-router-dom";
import { QuizContextInterface } from "../App.interfaces";

export const useQuizContext = () => {
  return useOutletContext<QuizContextInterface>();
};
