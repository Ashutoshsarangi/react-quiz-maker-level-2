export interface QuestionOriginalInterface {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

export interface QuestionInterface extends QuestionOriginalInterface {
  renderOption: Array<string>;
  id: string;
}

export interface ResponseInternal {
  correct_answer: string;
  correctAnswerId: string;
  user_answer: string;
  userAnswerId: string;
}
export interface ResponseInterface {
  [key: string]: Array<ResponseInternal>;
}

export interface FormValueInterface {
  category: string;
  difficulty: string;
}

export interface CategoryInterface {
  name: string;
  id: string;
}

export interface QuizContextInterface {
  formValue: FormValueInterface;
  setFormValue: React.Dispatch<React.SetStateAction<FormValueInterface>>;
  questions: Array<QuestionInterface>;
  response: ResponseInterface;
  submit: boolean;
  counter: number;
  clickHandle: () => void;
  submitResponseHandler: () => void;
  handleAnswerClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    question: QuestionInterface
  ) => void;
  clearForm: () => void;
}
