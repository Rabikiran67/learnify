import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import colors from 'colors';
import session from 'express-session';
import passport from 'passport';
import rateLimit from 'express-rate-limit'; // <-- IMPORT

import configurePassport from './config/passport.js';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

// Pre-load all models
import './models/User.js';
import './models/Course.js';
import './models/Category.js';
import './models/Lesson.js';
import './models/Enrollment.js';
import './models/Quiz.js';
import './models/Question.js';
import './models/QuizAttempt.js';
import './models/Assignment.js';
import './models/AssignmentSubmission.js';

// Import route files
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import courseRoutes from './routes/courses.js';
import categoryRoutes from './routes/categories.js';
import enrollmentRoutes from './routes/enrollments.js';
import uploadRoutes from './routes/upload.js';
import quizRoutes from './routes/quizRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import { nestedLessonRouter, singleLessonRouter } from './routes/lessons.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

configurePassport(passport);
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


// --- THIS IS THE NEW SECURITY FEATURE ---
// Rate Limiting Configuration
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 10 minutes'
});

// Apply the rate limiter to all API routes
app.use('/api', limiter);
// --- END OF NEW SECURITY FEATURE ---


// Mount API routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/lessons', singleLessonRouter);
app.use('/api/upload', uploadRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/assignments', assignmentRoutes);

const rootDir = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootDir, '/client/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(rootDir, 'client', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('API is running...'));
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});