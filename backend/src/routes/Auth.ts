import express from "express";
import { applyRoute } from "./applyRoute";
import { ErrorCode, ResponseError, Routes } from "@2tothe/shared";
import { sendSMSCode } from "../auth/sendSMSCode";
import passport from "passport";
import { IUserWithID } from "../auth/extendExpress";
import { authenticateSMS, InvalidOTPMessage } from "../auth/smsStrategy";

const router = express.Router();

applyRoute(router, Routes.Auth.sendSMSCodeRoute).use(async (body) => {
  const { phoneNumber } = body;
  try {
    const success = await sendSMSCode(phoneNumber);
    return { success };
  } catch (e) {
    throw new ResponseError(500, ErrorCode.SMSSendFail, "Failed to send SMS code");
  }
});

applyRoute(router, Routes.Auth.verifySMSCodeRoute).use(async (_, req) => {
  return await new Promise<{ user: IUserWithID }>((resolve, reject) => {
    authenticateSMS(req, resolve, reject);
  });
});

applyRoute(router, Routes.Auth.getIDRoute).use(async (_, req) => {
  if (!req.user) {
    throw new ResponseError(401, ErrorCode.Unauthorized, "User not found");
  }
  return { id: req.user.id };
});

export default router;
