import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { NO_OF_QUESTIONS } from "../../App.constants";

import Footer from "./Footer";

describe("Footer Component", () => {
  describe("It should render", () => {
    const props = {
      submit: false,
      submitResponseHandler: vi.fn(),
      counter: 1,
      createNewQuizHandler: vi.fn(),
      responseLen: 5,
    };
    afterEach(() => {
      cleanup();
    });

    it("Footer Component Rendered Successfully", () => {
      render(<Footer {...props} />);
    });

    it("when we click submit button", () => {
      render(<Footer {...props} />);
      const submitButton = screen.getByTestId("footerSubmitBtn");
      fireEvent.click(submitButton);
      expect(props.submitResponseHandler).toHaveBeenCalledOnce();
    });

    it.fails("when will not get the Submit button", () => {
      const updatedProps = {
        ...props,
        submit: true,
      };
      render(<Footer {...updatedProps} />);
      const submitButton = screen.getByTestId("footerSubmitBtn");
    });

    it("when will not get the Submit button", () => {
      const updatedProps = {
        ...props,
        submit: true,
      };
      render(<Footer {...updatedProps} />);
      const result = screen.getByTestId("footerResult");
      const createNewQuiz = screen.getByTestId("footerCreateNewQuiz");
      expect(result.textContent).toBe(
        `You Scored ${updatedProps.counter} out of ${NO_OF_QUESTIONS}`
      );
      fireEvent.click(createNewQuiz);
      expect(updatedProps.createNewQuizHandler).toHaveBeenCalledOnce();
    });
  });
});
