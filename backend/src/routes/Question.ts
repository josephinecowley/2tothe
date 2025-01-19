import { Router } from "express";
import { GetCurrentQuestionForPlace } from "../controllers/Question";
import { applyRoute } from "./applyRoute";
import { ResponseError, Routes } from "@2tothe/shared";

const router = Router();

applyRoute(router, Routes.Question.mostRecentQuestionForPlaceRoute).use(async (body) => {
  const { placeID } = body;
  const result = await GetCurrentQuestionForPlace(placeID);
  if (result.errorCode) {
    throw new ResponseError(404, result.errorCode, result.message);
  }
  return {
    question: result.question,
    date: result.date,
  };
});

export default router;
