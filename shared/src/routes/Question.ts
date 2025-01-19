import { z } from "zod";
import { IQuestion } from "./common/Question";
import { ZodQuestion } from "./common/Question";
import { Route } from "../routing";

export const mostRecentQuestionForPlaceRoute: Route<{ placeID: string }, { question: IQuestion; date: Date }> = {
  path: "/question/most-recent-for-place",
  method: "get",
  req: z.object({ placeID: z.string().uuid() }),
  res: z.object({ question: ZodQuestion, date: z.coerce.date() }),
};
