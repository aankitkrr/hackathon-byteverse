import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { userModel } from "./db";

dotenv.config();

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) return done(null, false);

      const existingUser = await userModel.findOne({ email });
      if (existingUser) return done(null, existingUser);

      const tempUser = {
        email,
        oauthProvider: "google",
        isNew: true,
      };

      return done(null, tempUser);
    } catch (err) {
      return done(err, undefined);
    }
  })
);

