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
