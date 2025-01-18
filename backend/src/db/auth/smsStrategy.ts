import passport from "passport";
import { User } from "../entities/User";
import { Strategy as CustomStrategy } from "passport-custom";
import { client } from "./twilioClient";
import { IUserWithID } from "./extendExpress";
import { ErrorCode, ResponseError } from "@2tothe/shared";

export const InvalidOTPMessage = "Invalid OTP";

export const useSmsStrategy = () => {
  passport.use(
    "sms",
    new CustomStrategy(async (req, done) => {
      const { phoneNumber, code } = req.body;

      try {
        // Use Twilio Verify to check the OTP
        const verificationCheck = await client.verify.v2
          .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
          .verificationChecks.create({ to: phoneNumber, code });

        if (verificationCheck.status === "approved") {
          // OTP approved, find or create a user
          let foundUser = await User.findOne({ where: { phoneNumber } });
          if (!foundUser) {
            foundUser = User.create({ phoneNumber });
            await foundUser.save();
          }
          return done(null, foundUser);
        } else {
          return done({ message: InvalidOTPMessage }, false);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );
};

export const authenticateSMS = (
  req: Express.Request,
  resolve: (value: { user: IUserWithID }) => void,
  reject: (reason?: any) => void,
) => {
  passport.authenticate("sms", (err: Error, user: IUserWithID, info?: { message?: string }) => {
    // TODO: should we handle these the same?
    if (err || !user) {
      console.error("Authentication error:", err, info);
      if (err?.message === InvalidOTPMessage) {
        return reject(new ResponseError(401, ErrorCode.Unauthorized, InvalidOTPMessage));
      }
      return reject(err || new Error("Authentication error"));
    }
    // Log the user in (establish a session)
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Login error:", loginErr);
        throw loginErr;
      }
      // Successful authentication
      return resolve({ user });
    });
  })(req);
};
