import { z } from "zod";
import { Route } from "../routing";

export const setUserAnswer: Route<{ userID: string; answer: string }, { success: boolean }> = {
  path: "/user-answers/set-user-answer",
  method: "post",
  req: z.object({ userID: z.string().uuid(), answer: z.string() }),
  res: z.object({ success: z.boolean() }),
};
