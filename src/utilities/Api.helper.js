import { NO_OF_QUESTIONS, BASE_URL } from "../App.constants";

export const getAllCategory = () => {
  const url = `${BASE_URL}api_category.php`;
  return fetch(url)
    .then((data) => data.json())
    .then((data) => data.trivia_categories);
};

export const getQuestions = (questionInfo) => {
  const { category: categoryId, difficulty } = questionInfo;
  const url = `${BASE_URL}api.php?amount=${NO_OF_QUESTIONS}&category=${categoryId}&difficulty=${difficulty}`;
  return fetch(url)
    .then((data) => data.json())
    .then((data) => data.results);
};
