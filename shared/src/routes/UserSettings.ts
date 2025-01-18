import { z } from "zod";
import { Route } from "../routing";

export const setUserPlaceRoute: Route<{ userID: string; newPlaceID: string }, { success: boolean }> = {
  path: "/user-settings/set-user-place",
  method: "post",
  req: z.object({ userID: z.string().uuid(), newPlaceID: z.string().uuid() }),
  res: z.object({ success: z.boolean() }),
};

export const setUserNicknameRoute: Route<{ userID: string; newNickname: string }, { success: boolean }> = {
  path: "/user-settings.set-user-nickname",
  method: "post",
  req: z.object({ userID: z.string().uuid(), newNickname: z.string() }),
  res: z.object({ success: z.boolean() }),
};
