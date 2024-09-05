// @vitest-environment jsdom
import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  describe("It should render", () => {
    it("Footer Component Rendered Successfully", () => {
      const props = {
        submit: false,
        submitResponseHandler: () => {},
        counter: 1,
        createNewQuizHandler: () => {},
        responseLen: 5,
      };
      render(<Footer {...props} />);
    });
  });
});
