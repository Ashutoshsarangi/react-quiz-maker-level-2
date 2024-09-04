import { NO_OF_QUESTIONS, BASE_URL } from "../App.constants";

// This is for getting the Category for the Questions
//TODO Will add caching here as it it kind of static data
export const getAllCategory = () => {
  const url = `${BASE_URL}api_category.php`;
  return fetch(url)
    .then((data) => data.json())
    .then((data) => data.trivia_categories);
};

// This is for getting Questions with category and difficulty
// This can be scalable instead of 5 you can add 15 questions, in app.constants.js
export const getQuestions = (questionInfo) => {
  const { category: categoryId, difficulty } = questionInfo;
  const url = `${BASE_URL}api.php?amount=${NO_OF_QUESTIONS}&category=${categoryId}&difficulty=${difficulty}`;
  return fetch(url)
    .then((data) => data.json())
    .then((data) => data.results);
};
