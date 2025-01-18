import express from "express";
import { applyRoute } from "./applyRoute";
import { ErrorCode, ResponseError, Routes } from "@2tothe/shared";
import { sendSMSCode } from "../db/auth/sendSMSCode";
import passport from "passport";

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

applyRoute(router, Routes.Auth.verifySMSCodeRoute, passport.authenticate("sms")).use(async (body, req) => {
  const user = req.user;
  if (!user) {
    throw new ResponseError(401, ErrorCode.Unauthorized, "Unauthorized");
  }
  return { user };
});

export default router;
