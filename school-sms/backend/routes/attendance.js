import { Router } from 'express';
import { pool } from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
const router = Router();

// Get students of a class
router.get('/class/:class_id/students', authenticate, async (req, res) => {
  const [rows] = await pool.query('SELECT id, full_name, student_code FROM students WHERE class_id=? ORDER BY full_name', [req.params.class_id]);
  res.json(rows);
});

// Mark attendance for a date
router.post('/mark', authenticate, authorize('teacher','admin'), async (req, res) => {
  const { class_id, date, items } = req.body; // items: [{student_id, status, note}]
  const teacher_id = req.user.id;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    for (const it of items) {
      await conn.query(
        'REPLACE INTO attendance (class_id, student_id, date, status, teacher_id, note) VALUES (?,?,?,?,?,?)',
        [class_id, it.student_id, date, it.status, teacher_id, it.note || null]
      );
    }
    await conn.commit();
    res.json({ ok: true });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ error: e.message });
  } finally {
    conn.release();
  }
});

// Get attendance report by date range & class
router.get('/report', authenticate, async (req, res) => {
  const { class_id, start, end } = req.query;
  const [rows] = await pool.query(`
    SELECT a.date, s.full_name, s.student_code, a.status, u.full_name AS teacher
    FROM attendance a
    JOIN students s ON s.id=a.student_id
    LEFT JOIN users u ON u.id=a.teacher_id
    WHERE a.class_id=? AND a.date BETWEEN ? AND ?
    ORDER BY a.date, s.full_name
  `, [class_id, start, end]);
  res.json(rows);
});

export default router;
