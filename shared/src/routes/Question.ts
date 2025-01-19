import { z } from "zod";
import { Route } from "../routing";

export const getMostRecentQuestionForPlaceRoute: Route<{ placeID: string }, { questionID: string }> = {
  path: "/question/get-most-recent-question-for-place",
  method: "get",
  req: z.object({ placeID: z.string().uuid() }),
  res: z.object({ questionID: z.string().uuid() }),
};
