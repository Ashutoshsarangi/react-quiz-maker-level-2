import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
      render(
        <MemoryRouter>
          <Footer {...props} />
        </MemoryRouter>
      );
    });

    it("when we click submit button", () => {
      render(
        <MemoryRouter>
          <Footer {...props} />
        </MemoryRouter>
      );
      const submitButton = screen.getByTestId("footerSubmitBtn");
      fireEvent.click(submitButton);
      expect(props.submitResponseHandler).toHaveBeenCalledOnce();
    });

    it.fails("when will not get the Submit button", () => {
      const updatedProps = {
        ...props,
        submit: true,
      };
      render(
        <MemoryRouter>
          <Footer {...updatedProps} />
        </MemoryRouter>
      );
      const submitButton = screen.getByTestId("footerSubmitBtn");
    });

    it("It will get the Result Banner with different color Background", () => {
      const updatedProps = {
        ...props,
        submit: true,
      };
      render(
        <MemoryRouter>
          <Footer {...updatedProps} />
        </MemoryRouter>
      );
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
