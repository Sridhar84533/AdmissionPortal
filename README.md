# 🎓 AdmitPortal — University Admission Management System

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application for managing university admissions end-to-end.

---

## ✨ Features

### Public Website
- 🏠 **Landing Page** — Animated hero, features, stats, testimonials, CTA
- ℹ️ **About Us** — Mission, vision, team, milestones
- 📝 **Blogs** — Filterable blog grid with search & newsletter
- 📞 **Contact** — Contact form, FAQ accordion, support channels

### Applicant Portal
- 🔐 Register & Login (JWT auth, bcrypt passwords)
- 📋 Multi-step application form
- 👤 Personal & Academic Information
- 📁 Document Upload & Tracking
- 💳 Payment Gateway (mock)
- 📅 Appointment Scheduling
- 📊 Real-time Application Status Timeline
- 🔔 Notifications Centre
- 🆘 Support & Feedback

### Admin Panel (role-based, hidden URL)
- 📊 Admin Dashboard
- 👥 Applicant Management
- 🔍 Document Review & Verification
- 💬 Support Ticket Management
- *(Admin role assigned manually in MongoDB)*

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, React Router v6, Vite         |
| Styling   | Vanilla CSS (custom design system)      |
| Backend   | Node.js, Express.js (ES Modules)        |
| Database  | MongoDB + Mongoose                      |
| Auth      | JWT + bcryptjs                          |
| Icons     | Lucide React                            |

---

## 📁 Project Structure

```
AdmissionPortal/
├── backend/
│   ├── controllers/       # authController, applicationController…
│   ├── middleware/        # authMiddleware, adminMiddleware
│   ├── models/            # User, Application, Document, Appointment…
│   ├── routes/            # auth.js, application.js…
│   ├── server.js          # Express entry point
│   └── .env               # ⚠️ NOT committed — see below
│
└── frontend/
    ├── public/
    └── src/
        ├── components/    # Layout, AdminLayout, PublicLayout
        ├── context/       # AuthContext (JWT state)
        ├── pages/         # All page components
        └── App.jsx        # Route definitions
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/AdmissionPortal.git
cd AdmissionPortal
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
MONGO_URI=mongodb://localhost:27017/admitportal
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

Start the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at **http://localhost:3000** (or next available port).

---

## 🔑 Admin Access

Admin accounts **cannot be created through the registration form** — this is intentional.

To create an admin:
1. Register normally via `/register` (creates an `applicant` account)
2. Open MongoDB Compass or Atlas
3. Find the user in the `users` collection
4. Change `"role": "applicant"` → `"role": "admin"`
5. Log in via the **hidden admin URL**: `/admin/login`

---

## 🌿 Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable production-ready code |
| `dev` | Active development |
| `feature/xxx` | New features |
| `fix/xxx` | Bug fixes |

---

## 📦 Deployment (Coming Soon)
- Frontend → Vercel / Netlify
- Backend → Render / Railway
- Database → MongoDB Atlas

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License
[MIT](LICENSE)
