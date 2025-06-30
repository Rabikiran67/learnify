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

// Apply validation ONLY to the /register route
router.post('/register', registerValidationRules(), validate, registerUser);

// All other routes do not have this validation
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  async (req, res) => { 
    const token = await generateToken(req.user.id);
    res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
  }
);

export default router;