import { ID_PREFIX } from "../App.constants";

const get2Index = (len) => {
  const indexes = [];
  while (indexes.length !== 2) {
    const idx = Math.floor(Math.random() * len);
    if (indexes.indexOf(idx) < 0) {
      indexes.push(idx);
    }
  }
  return indexes;
};

const getDynamicOptions = (arr) => {
  const [i, j] = get2Index(arr.length);
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  return arr;
};

export const handleOptionsForQuestion = (questions) => {
  const temp = questions.map((question, index) => {
    return {
      ...question,
      renderOption: getDynamicOptions([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
      id: `${question.difficulty}_${index}`,
    };
  });

  console.log(temp);
  return temp;
};

export const updateResponseWithIds = (question, dataSet) => {
  const obj = {};
  obj[question.id] = [];
  for (let i = 0; i < question.renderOption.length; i++) {
    obj[question.id].push({
      correct_answer: question.correct_answer,
      correctAnswerId: `${ID_PREFIX}_${question.id}_${
        question.renderOption[i] === question.correct_answer ? i : null
      }`,
      user_answer: dataSet.response,
      userAnswerId: dataSet.responseId,
    });
  }

  return obj;
};

export const getResultCount = (response) => {
  let tempCounter = 0;
  for (let key in response) {
    const filter = response[key].filter(
      (data) => data.correctAnswerId === data.userAnswerId
    );
    if (filter.length) {
      tempCounter++;
    }
  }

  return tempCounter;
};

export const getAppropriateClassName = (submit, response, uniqueId) => {
  const classNames = [];

  if (submit) {
    if (response?.correctAnswerId === uniqueId) {
      classNames.push("active");
    }
    if (response?.userAnswerId === uniqueId) {
      classNames.push("wrong__answer");
    }
    if (response?.userAnswerId === response?.correctAnswerId) {
      classNames.push("right__answer");
    }
  } else {
    if (response?.userAnswerId === uniqueId) {
      classNames.push("active");
    }
  }
  return classNames.join(" ");
};
