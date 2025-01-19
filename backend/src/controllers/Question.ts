import { In, Not, Or } from "typeorm";
import { Place } from "../db/entities/Place";
import { ScheduledQuestion } from "../db/entities";
import { ErrorCode } from "@2tothe/shared";

export async function GetCurrentQuestionForPlace(placeID: string) {
  const place = await Place.findOne({ where: { id: placeID } });
  if (!place) {
    return {
      errorCode: ErrorCode.NotFound,
      message: "Place not found",
    };
  }

  const scheduledQuestion = await ScheduledQuestion.createQueryBuilder("scheduledQuestion")
    .innerJoinAndSelect("scheduledQuestion.whitelistedPlaces", "place")
    .where("place.id = :placeID", { placeID })
    .orWhere("NOT EXISTS (SELECT 1 FROM scheduled_question_whitelisted_places_place sqwp)")
    .orderBy("scheduledQuestion.date", "DESC")
    .getOne();

  if (!scheduledQuestion) {
    return {
      errorCode: ErrorCode.NotFound,
      message: "No scheduled question found",
    };
  }

  return {
    question: scheduledQuestion.question,
    date: scheduledQuestion.date,
  };
}
