import { Router } from 'express';
import { pool } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();

router.get('/dashboard', authenticate, async (req, res) => {
  const [[{ total_classes }]] = await pool.query('SELECT COUNT(*) AS total_classes FROM classes');
  const [[{ total_students }]] = await pool.query('SELECT COUNT(*) AS total_students FROM students');
  const [[{ total_teachers }]] = await pool.query('SELECT COUNT(*) AS total_teachers FROM users WHERE role="teacher"');
  const [[{ last_attendance }]] = await pool.query('SELECT COUNT(*) AS last_attendance FROM attendance WHERE date = CURDATE()');
  res.json({ total_classes, total_students, total_teachers, last_attendance });
});

export default router;
