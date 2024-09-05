// @vitest-environment jsdom
import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  describe("It should render", () => {
    it("Header Component Rendered Successfully", () => {
      render(<Header submit={false} />);
    });
  });
});
