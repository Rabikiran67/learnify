# Learnify – MERN Stack Online Learning Platform

A comprehensive, full-stack **online learning platform** built using the **MERN** stack (MongoDB, Express, React, Node.js). Learnify provides a powerful role-based system for **Students**, **Instructors**, and **Administrators** to deliver and consume educational content.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**🔗 Live Demo:** https://learnify-three-black.vercel.app/

---

## ✨ Key Features

### 🧑‍🎓 Student
- Browse and enroll in courses
- View video/PDF/image-based lessons
- Track progress
- Take quizzes and submit assignments

### 🧑‍🏫 Instructor
- Create and manage courses
- Upload lessons (video, PDF, slides)
- Create quizzes and assignments
- Manage enrolled students

### 👑 Admin
- Full user management (promote/demote/delete users)
- View and manage all courses and categories
- Access instructor features

### 🔐 Authentication
- Secure JWT-based authentication
- Google OAuth login using Passport.js
- Role-based route protection

### 📚 Course System
- Full CRUD for courses, lessons, categories, and quizzes
- Video via React Player, PDFs via react-pdf-viewer
- Image-based slides with Swiper.js

### 📊 Student Tracking
- Progress tracking (mark lessons complete)
- Conditional unlocking of next content
- Quiz scoring and assignment feedback

### 💎 Modern UI
- Responsive UI with Tailwind CSS
- Clean dashboards for each role
- Rich-text editing with react-quill

---

## 📸 Screenshots

### 🔑 Authentication
| Login Page | Register Page |
|------------|----------------|
| ![](./docs/login-page.png) | ![](./docs/register-page.png) |

### 🧑‍🎓 Student Interface
| Dashboard | Course Learning |
|-----------|------------------|
| ![](./docs/student-dashboard.png) | ![](./docs/learning-page.png) |

### 🧑‍🏫 Instructor Panel
| My Courses | Manage Course |
|------------|----------------|
| ![](./docs/instructor-dashboard.png) | ![](./docs/manage-course.png) |

### 👑 Admin Panel
| Users | Courses |
|--------|---------|
| ![](./docs/admin-users.png) | ![](./docs/admin-courses.png) |

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Redux Toolkit + RTK Query
- React Router
- Tailwind CSS
- react-quill (Rich text editor)
- swiper (Slideshow)
- @react-pdf-viewer

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + Passport.js (Google OAuth)
- Cloudinary (Image/file upload)
- Nodemailer (Email notifications)

### Deployment
- **Frontend**: Vercel  
- **Backend**: Render

---

## 🚀 Run Locally

From the root of the project, run the following command to start both backend and frontend:

```bash
npm run dev
