import React from "react";
import { describe, it, afterEach, vi, expect } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import QuizBody from "./QuizBody";

describe("QuizBody Component", () => {
  describe("It should render", () => {
    const props = {
      questions: [
        {
          id: "123",
          question: "how are you ?",
          correct_answer: "easy_0",
          incorrect_answers: [],
          type: "movie",
          difficulty: "easy",
          category: "film",
          renderOption: ["B", "D", "C", "A"],
        },
      ],
      handleAnswerClick: vi.fn(),
      response: {},
      submit: true,
    };
    afterEach(() => {
      cleanup();
    });

    it("QuizBody Component Rendered Successfully", () => {
      render(<QuizBody {...props} />);
    });

    it("QuizBody Component Segmented Button Click", () => {
      render(<QuizBody {...props} />);
      const segmentedBtnParent = screen.getByTestId("segmentedBtnDelegation");
      fireEvent.click(segmentedBtnParent);
      expect(props.handleAnswerClick).toHaveBeenCalled();
    });
  });
});
