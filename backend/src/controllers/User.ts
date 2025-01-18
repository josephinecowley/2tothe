import { ErrorCode } from "@2tothe/shared";
import { Place, User } from "../db/entities";

async function findUserByNickname(nickname: string) {
  return await User.findOne({ where: { nickname }, relations: { place: true } });
}

async function findUserByID(userID: User["id"]) {
  return await User.findOne({ where: { id: userID }, relations: { place: true } });
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
