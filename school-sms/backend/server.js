import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db.js';
import authRoutes from './routes/auth.js';
import classRoutes from './routes/classes.js';
import studentRoutes from './routes/students.js';
import teacherRoutes from './routes/teachers.js';
import attendanceRoutes from './routes/attendance.js';
import examsRoutes from './routes/exams.js';
import resultsRoutes from './routes/results.js';
import reportsRoutes from './routes/reports.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/reports', reportsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, async () => {
  // Validate DB connection
  await pool.query('SELECT 1');
  console.log('API running on port', port);
});
