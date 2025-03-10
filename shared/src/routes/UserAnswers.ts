import { z } from "zod";
import { Route } from "../routing";

const zodAOrB = z.union([z.literal("A"), z.literal("B")]);

export const setUserAnswerRoute: Route<
  { answer: "A" | "B"; questionID: string; userID: string; isOverride: boolean },
  { success: boolean }
> = {
  path: "/user-answers/set-user-answer",
  method: "post",
  req: z.object({ answer: zodAOrB, questionID: z.string().uuid(), userID: z.string().uuid(), isOverride: z.boolean() }),
  res: z.object({ success: z.boolean() }),
};
