import { describe, expect, it } from "vitest";
import {
  get2Index,
  getDynamicOptions,
  handleOptionsForQuestion,
  updateResponseWithIds,
  getResultCount,
  getAppropriateClassName,
} from "./Question.helpers";

describe("Question.helpers.ts", () => {
  describe("get2Index", () => {
    it("get2Index With len 2", () => {
      const [i, j] = get2Index(2);
      expect(i).not.greaterThan(2);
      expect(j).not.greaterThan(2);
    });

    it("get2Index With len 4", () => {
      // const mock = vi.fn().mockImplementation(get2Index).mockReturnValue([0, 3]);
      const [i, j] = get2Index(4);
      expect(i).not.greaterThan(4);
      expect(j).not.greaterThan(4);
    });

    it.fails("get2Index With len 4 should fail", () => {
      const [i, j] = get2Index(4);
      expect(i).greaterThan(5);
      expect(j).greaterThan(5);
    });
  });

  describe("getDynamicOptions", () => {
    it("getDynamicOptions, Only checking the Length", () => {
      const arr = ["ABC", "DEF", "IJK", "XYZ"];
      expect(getDynamicOptions(arr).length).toBe(4);
    });

    it.fails("getDynamicOptions, Here it would fail", () => {
      const arr = ["ABC", "DEF", "IJK", "XYZ"];
      expect(getDynamicOptions(arr)).toEqual(["ABC", "DEF", "IJK", "XYZ"]);
    });
  });

  describe("handleOptionsForQuestion", () => {
    it("handleOptionsForQuestion should have Id ands render Option", () => {
      const questions = [
        {
          type: "abc",
          difficulty: "easy",
          category: "film",
          question: "Hey there, How are you ?",
          correct_answer: "B",
          incorrect_answers: ["A", "D", "C"],
        },
      ];
      expect(handleOptionsForQuestion(questions)[0]).toMatchObject({
        id: "easy_0",
      });
      expect(handleOptionsForQuestion(questions)[0].renderOption.length).toBe(
        4
      );
    });
  });

  describe("updateResponseWithIds", () => {
    it("updateResponseWithIds should have correctAnswerId", () => {
      const questions = {
        type: "abc",
        difficulty: "easy",
        category: "film",
        question: "Hey there, How are you ?",
        correct_answer: "B",
        incorrect_answers: ["A", "D", "C"],
        id: "easy_0",
        renderOption: ["A", "D", "B", "C"],
      };
      const dataSet = {
        response: "ABC",
        responseId: "easy_0",
      };
      expect(
        updateResponseWithIds(questions, dataSet)["easy_0"]
      ).toContainEqual({
        correctAnswerId: "RESPONSE_easy_0_2",
        correct_answer: "B",
        userAnswerId: "easy_0",
        user_answer: "ABC",
      });
    });
  });

  describe("getResultCount", () => {
    it("getResultCount should have the Result Count", () => {
      const response = {
        easy_0: [
          {
            correct_answer: "ABC",
            correctAnswerId: "easy_0",
            user_answer: "ABC",
            userAnswerId: "easy_0",
          },
        ],
      };
      const responseUpdated = {
        easy_0: [
          {
            correct_answer: "ABC",
            correctAnswerId: "easy_1",
            user_answer: "ABC",
            userAnswerId: "easy_0",
          },
        ],
      };
      expect(getResultCount(response)).toBe(1);
      expect(getResultCount(responseUpdated)).toBe(0);
    });
  });

  describe("getAppropriateClassName", () => {
    it("getAppropriateClassName should have the Result active", () => {
      const response = {
        correct_answer: "ABC",
        correctAnswerId: "easy_0",
        user_answer: "ABC",
        userAnswerId: "easy_0",
      };

      expect(getAppropriateClassName(false, response, "easy_0")).toBe("active");
      expect(getAppropriateClassName(true, response, "easy_0")).toBe("active");
    });

    it("getAppropriateClassName should have the Result wrongAnswer", () => {
      const response = {
        correct_answer: "ABC",
        correctAnswerId: "easy_0",
        user_answer: "ABC",
        userAnswerId: "easy_1",
      };

      expect(getAppropriateClassName(false, response, "easy_0")).toBe("");
      expect(getAppropriateClassName(true, response, "easy_1")).toBe(
        "wrongAnswer"
      );
    });
  });
});
