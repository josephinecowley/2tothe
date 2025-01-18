import { z } from "zod";
import { Route } from "../routing";

export const setUserPlaceRoute: Route<{ userID: string; newPlaceID: string }, { success: boolean }> = {
  path: "/set-user-place",
  method: "post",
  req: z.object({ userID: z.string().uuid(), newPlaceID: z.string().uuid() }),
  res: z.object({ success: z.boolean() }),
};
