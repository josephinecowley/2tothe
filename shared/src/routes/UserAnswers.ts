import { z } from "zod";
import { Route } from "../routing";

export const setUserAnswer: Route<{ answer: string; questionID: string; userID: string }, { success: boolean }> = {
  path: "/user-answers/set-user-answer",
  method: "post",
  req: z.object({ answer: z.string(), questionID: z.string().uuid(), userID: z.string().uuid() }),
  res: z.object({ success: z.boolean() }),
};
