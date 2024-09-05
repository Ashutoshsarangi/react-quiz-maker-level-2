import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  describe("It should render", () => {
    afterEach(() => {
      cleanup();
    });

    it("Header Component Rendered Successfully", () => {
      render(<Header submit={false} />);
    });

    it("Header Component Rendered With Quiz maker", async () => {
      render(<Header submit={false} />);
      const headingTitle = screen.getByTestId("headerTitle");
      expect(headingTitle.textContent).toBe("QUIZ MAKER");
    });

    it("Header Component Rendered With Result", async () => {
      render(<Header submit={true} />);
      const headingTitle = screen.getByTestId("headerTitle");
      expect(headingTitle.textContent).toBe("RESULTS");
    });
  });
});
