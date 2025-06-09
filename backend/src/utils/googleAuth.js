require('dotenv').config();
const passport = require('passport');
const Ecomuser = require('../model/Ecom');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
 
 
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLINT_ID,
    clientSecret: process.env.CILNT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback: true
  },
  async function (req, accessToken, refreshToken, profile, done) {
    try {
      // Check if user exists in DB
      let user = await Ecomuser.findOne({ googleId: profile.id });
 if (!user) {
         user = await Ecomuser.create({
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          googleId: profile.id,
          role:'GENERAL',
          date:new Date(),
          retailer:{}
         });
      }

      return done(null, user); // Pass user to next step (callback)
    } catch (err) {
      return done(err, null);
    }
  }
));
