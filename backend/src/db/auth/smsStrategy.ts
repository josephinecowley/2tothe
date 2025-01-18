import passport from "passport";
import { User } from "../entities/User";
import { Strategy as CustomStrategy } from "passport-custom";
import { client } from "./twilioClient";

export const useSmsStrategy = () => {
  passport.use(
    "sms",
    new CustomStrategy(async (req, done) => {
      const { phoneNumber, code } = req.body;

      try {
        // Use Twilio Verify to check the OTP
        const verificationCheck = await client.verify.v2
          .services("YOUR_TWILIO_VERIFY_SERVICE_SID")
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
          return done({ message: "Invalid OTP" }, null);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );
};
