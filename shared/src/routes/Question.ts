import { z } from "zod";
import { Route } from "../routing";
import * as Types from "../types";

export const getMostRecentQuestionForPlaceRoute: Route<{ placeID: string }, { questionID: string }> = {
  path: "/question/get-most-recent-question-for-place",
  method: "get",
  req: z.object({ placeID: z.string().uuid() }),
  res: z.object({ questionID: z.string().uuid() }),
};

export const getAnswerableQuestionsForUserRoute: Route<
  { userID: string; count: number },
  { questions: Types.IBaseQuestion[] }
> = {
  path: "/question/get-answerable-questions-for-user",
  method: "get",
  req: z.object({ userID: z.string(), count: z.number() }),
  res: z.object({ questions: Types.ZodBaseQuestion.array() }),
};
