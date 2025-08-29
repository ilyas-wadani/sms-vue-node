# School Attendance & Exams Management (Vue 3 + Tailwind + Node.js + MySQL)

## 1) Database (XAMPP / phpMyAdmin)
- Start **Apache** and **MySQL** in XAMPP.
- Open phpMyAdmin → run `backend/schema.sql` then `backend/seed.sql`.

## 2) Backend
```bash
cd backend
cp .env.example .env   # edit DB_USER/DB_PASSWORD if needed
npm install
node server.js
# Seed default admin (one time):
# open http://localhost:4000/api/auth/seed-admin in your browser
```
API base: `http://localhost:4000/api`

## 3) Frontend
```bash
cd frontend
npm install
npm run dev
```
- Open the shown URL (default `http://localhost:5173`).
- Login as **admin@school.local / admin123**.

## Notes
- Teachers can log in (create them from Admin → Users route not included in UI, but available via /api/teachers).
- Students can check exam results publicly at `/results` page with their Student ID (e.g., S-1001).
- Attendance statuses: `present, absent, late, excused`.

## Customize Branding
- Edit `src/components/TopBar.vue` header text and add your school logo.
