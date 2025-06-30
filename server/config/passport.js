import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const googleCallbackURL = process.env.NODE_ENV === 'production'
  ? `${process.env.BACKEND_URL}/api/auth/google/callback`
  : '/api/auth/google/callback';

export default function(passport) {
  passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: googleCallbackURL,
        passReqToCallback: true // Pass the request object to the callback
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          // --- THIS IS THE GUARANTEED FIX ---
          // Check if a user exists with this Google ID OR this email address
          let user = await User.findOne({ 
            $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] 
          });

          // The 'state' parameter helps us know if this flow started from 'login' or 'register'
          const state = JSON.parse(req.query.state);

          if (user) {
            // User exists. If they don't have a googleId yet, add it.
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user); // Proceed with login
          } else {
            // User does not exist.
            if (state.action === 'register') {
              // If the action was 'register', it's okay to create a new user.
              const newUser = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
              });
              return done(null, newUser);
            } else {
              // If the action was 'login', do NOT create a user. Return an error.
              return done(null, false, { message: 'This email is not registered. Please sign up first.' });
            }
          }
          // --- END OF GUARANTEED FIX ---
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}