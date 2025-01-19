import { Router } from "express";
import { applyRoute } from "./applyRoute";
import { getMostRecentQuestionForPlace } from "../controllers/Question";
import { ErrorCode, ResponseError, Routes } from "@2tothe/shared";

const router = Router();

applyRoute(router, Routes.Question.getMostRecentQuestionForPlaceRoute).use(async (body) => {
  const result = await getMostRecentQuestionForPlace(body.placeID);
  if (result.errorCode) {
    throw new ResponseError(404, result.errorCode, result.message);
  }
  return { questionID: result.mostRecentQuestionID };
});

export default router;
