import express from "express";
import { applyRoute } from "./applyRoute";
import { ErrorCode, ResponseError, Routes } from "@2tothe/shared";
import { sendSMSCode } from "../db/auth/sendSMSCode";

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

export default router;
