import {
  ID_PREFIX,
  CSS_ACTIVE,
  CSS_RIGHT_ANSWER,
  CSS_WRONG_ANSWER,
} from "../App.constants";
import {
  QuestionInterface,
  ResponseInterface,
  ResponseInternal,
} from "../App.interfaces";

/**
 *
 * @param {*} len, Here I am trying to make dynamic, where we get the random numbers with in the range
 * @returns
 * the random nos / indexes
 */
const get2Index = (len: number): Array<number> => {
  const indexes: Array<number> = [];
  while (indexes.length !== 2) {
    const idx: number = Math.floor(Math.random() * len);
    if (indexes.indexOf(idx) < 0) {
      indexes.push(idx);
    }
  }
  return indexes;
};

/**
 *
 * @param {*} arr, Here we will get all the options
 * to make it dynamic I am using an function which will return 2 indexes (Random)
 * and I will swap these 2 index position in the array.
 * as the indexes are always dynamic so the array will be dynamic position the answer
 * @returns
 */
const getDynamicOptions = (arr: Array<string>): Array<string> => {
  const [i, j] = get2Index(arr.length);
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  return arr;
};

// This function is responsible for getting dynamic rended questions ready for
// the DOM to rendering the options, I added Ids so that we can use as a key in the listing.
export const handleOptionsForQuestion = (
  questions: Array<QuestionInterface>
) => {
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

  return temp;
};

// This function I added for Handling question Ids and correct answerIds and in future I will use it for result count
export const updateResponseWithIds = (
  question: QuestionInterface,
  dataSet: DOMStringMap
) => {
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

// This function is responsible for getting the no of correct answers
export const getResultCount = (response: ResponseInterface): number => {
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

// This is bit tricky function I added for getting the proper class name based on situations
/**
 *
 * @param {*} submit, either submitted / not
 * @param {*} response // Response Object
 * @param {*} uniqueId // Id
 * @returns
 * there are several conditions to match
 * 1. hover condition
 * 2. when User click
 * 3. after submit
 *    a. wrong answer (red)
 *    b. correct Answer(green)
 *    c. nad when correct answer is same as wrong answer
 */
export const getAppropriateClassName = (
  submit: boolean,
  response: ResponseInternal,
  uniqueId: string
): string => {
  const classNames: Array<string> = [];

  if (submit) {
    if (response?.correctAnswerId === uniqueId) {
      classNames.push(CSS_ACTIVE);
    }
    if (response?.userAnswerId === uniqueId) {
      classNames.push(CSS_WRONG_ANSWER);
    }
    if (response?.userAnswerId === response?.correctAnswerId) {
      classNames.push(CSS_RIGHT_ANSWER);
    }
  } else {
    if (response?.userAnswerId === uniqueId) {
      classNames.push(CSS_ACTIVE);
    }
  }
  return classNames.join(" ");
};
