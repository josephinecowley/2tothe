import passport from "passport";
import { User } from "../entities/User";
import "./extendExpress";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const foundUser = await User.findOne({ where: { id } });
    done(null, foundUser);
  } catch (err) {
    done(err);
  }
});
