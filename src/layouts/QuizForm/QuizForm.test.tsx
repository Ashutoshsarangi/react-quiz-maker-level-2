import React from "react";
import { describe, it, afterEach, vi, expect } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import QuizForm from "./QuizForm";

describe("QuizForm Component", () => {
  describe("It should render", () => {
    const props = {
      formValue: { category: "", difficulty: "" },
      setFormValue: vi.fn(),
      clickHandle: vi.fn(),
      submit: false,
      clearForm: vi.fn(),
    };

    afterEach(() => {
      cleanup();
    });

    it("QuizForm Component Rendered Successfully", () => {
      render(<QuizForm {...props} />);
    });

    it("QuizForm Component When change the category drop down", () => {
      render(<QuizForm {...props} />);
      const categoryDropDown = screen.getByTestId("categorySelect");
      fireEvent.change(categoryDropDown);
      expect(props.setFormValue).toHaveBeenCalledOnce();
    });

    it("QuizForm Component When change the category drop down", () => {
      render(<QuizForm {...props} />);
      const difficultyDropDown = screen.getByTestId("difficultySelect");
      fireEvent.change(difficultyDropDown);
      expect(props.setFormValue).toHaveBeenCalled();
    });

    it("QuizForm Component When change the category drop down", () => {
      render(<QuizForm {...props} />);
      const createBtn = screen.getByTestId("createBtn");
      fireEvent.click(createBtn);
      expect(createBtn.textContent).toBe("Create");
      expect(props.clickHandle).toHaveBeenCalled();
    });
  });
});
