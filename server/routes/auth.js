import express from 'express';
import passport from 'passport';
import { 
  registerUser, 
  loginUser, 
  logoutUser 
} from '../controllers/authController.js';
import generateToken from '../utils/jwt.js';
import { registerValidationRules, validate } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', registerValidationRules(), validate, registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// --- THIS IS THE GUARANTEED FIX ---
// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: process.env.NODE_ENV === 'production' 
      ? `${process.env.FRONTEND_URL}/login` 
      : 'http://localhost:5173/login',
    session: false 
  }),
  async (req, res) => {
    const token = await generateToken(req.user.id);
    // Dynamically build the redirect URL based on the environment
    const redirectURL = process.env.NODE_ENV === 'production'
      ? `${process.env.FRONTEND_URL}/auth/callback?token=${token}`
      : `http://localhost:5173/auth/callback?token=${token}`;
      
    res.redirect(redirectURL);
  }
);
// --- END OF GUARANTEED FIX ---

export default router;