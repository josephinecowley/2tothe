import { ErrorCode } from "@2tothe/shared";
import { Place, Question, User, UserAnswer } from "../db/entities";
export async function findUserByNickname(nickname: string) {
  return await User.findOne({ where: { nickname }, relations: { place: true } });
}

async function findUserByID(userID: User["id"]) {
  return await User.findOne({ where: { id: userID }, relations: { place: true } });
}

async function findQuestionByID(questionID: Question["id"]) {
  return await User.findOne({ where: { id: questionID } });
}

export async function setUserPlace(userID: User["id"], newPlaceID: Place["id"]) {
  const user = await findUserByID(userID);
  if (!user) {
    return {
      errorCode: ErrorCode.NotFound,
      message: `No one has the user id: ${userID}.`,
    };
  }

  const newPlace = await Place.findOne({ where: { id: newPlaceID } });
  if (!newPlace) {
    return {
      errorCode: ErrorCode.NotFound,
      message: `No place has the place id: ${newPlaceID}.`,
    };
  }

  user.place = newPlace;
  await user.save();

  return {
    message: `User place was updated to ${user.place.placeName}`,
  };
}

export async function setUserNickname(userID: User["id"], newNickname: User["nickname"]) {
  const user = await findUserByID(userID);
  if (!user) {
    return {
      errorCode: ErrorCode.NotFound,
      message: `No user has the id: ${userID}`,
    };
  }

  user.nickname = newNickname;
  await user.save();

  return {
    message: `User place was updated to ${user.nickname}`,
  };
}

export async function setUserAnswer(answer: UserAnswer["answer"], questionID: Question["id"], userID: User["id"]) {
  const user = await findUserByID(userID);
  if (!user) {
    return {
      errorCode: ErrorCode.NotFound,
      message: `No user has the id: ${userID}`,
    };
  }

  const question = await findQuestionByID(questionID);
  if (!question) {
    return {
      errorCode: ErrorCode.NotFound,
      message: `No question has the id: ${questionID}`,
    };
  }

  const newUserAnswer = UserAnswer.create({
    answer,
    question,
    user,
  });

  await newUserAnswer.save();

  return {
    message: `User answer was updated to ${newUserAnswer.answer}`,
  };
}
