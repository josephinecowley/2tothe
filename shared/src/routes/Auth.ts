import { z } from "zod";
import { Route } from "../routing";

export const sendSMSCodeRoute: Route<{ phoneNumber: string }, { success: boolean }> = {
  path: "/auth/send-sms-code",
  method: "post",
  req: z.object({ phoneNumber: z.string() }),
  res: z.object({ success: z.boolean() }),
};

export const verifySMSCodeRoute: Route<{}, { user: { id: string } }> = {
  path: "/auth/verify-sms-code",
  method: "post",
  req: z.object({}),
  res: z.object({ user: z.object({ id: z.string() }) }),
};
