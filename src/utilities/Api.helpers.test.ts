import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import * as ApiHelper from "./Api.helpers";

describe("Api.helper", () => {
  describe("getAllCategory", () => {
    let spyGetAllCategory;
    let spyGetQuestions;

    beforeEach(() => {
      spyGetAllCategory = vi
        .spyOn(ApiHelper, "getAllCategory")
        .mockResolvedValue([
          {
            id: "12",
            name: "asda",
          },
        ]);

      spyGetQuestions = vi.spyOn(ApiHelper, "getQuestions").mockResolvedValue([
        {
          type: "my",
          difficulty: "easy",
          category: "common",
          question: "How are you ?",
          correct_answer: "C",
          incorrect_answers: ["A", "B", "D"],
        },
      ]);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("get All category from API", async () => {
      await ApiHelper.getAllCategory();
      expect(spyGetAllCategory).toHaveBeenCalledOnce();
      expect(spyGetAllCategory).toHaveResolvedWith([
        {
          id: "12",
          name: "asda",
        },
      ]);
    });

    it("getQuestions", async () => {
      await ApiHelper.getQuestions({ category: "simple", difficulty: "easy" });
      expect(spyGetQuestions).toHaveBeenCalledOnce();
      expect(spyGetQuestions).toHaveResolvedWith([
        {
          type: "my",
          difficulty: "easy",
          category: "common",
          question: "How are you ?",
          correct_answer: "C",
          incorrect_answers: ["A", "B", "D"],
        },
      ]);
    });
  });
});
