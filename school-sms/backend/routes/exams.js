import { Router } from 'express';
import { pool } from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
const router = Router();

router.get('/', authenticate, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM exams ORDER BY date DESC');
  res.json(rows);
});

router.post('/', authenticate, authorize('admin','teacher'), async (req, res) => {
  const { name, term, year, subject, class_id, date } = req.body;
  const [r] = await pool.query(
    'INSERT INTO exams (name, term, year, subject, class_id, date) VALUES (?,?,?,?,?,?)',
    [name, term, year, subject, class_id, date]
  );
  res.json({ id: r.insertId });
});

router.post('/:id/marks', authenticate, authorize('admin','teacher'), async (req, res) => {
  const exam_id = req.params.id;
  const { items } = req.body; // [{student_id, marks}]
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    for (const it of items) {
      await conn.query('REPLACE INTO results (exam_id, student_id, marks, grade) VALUES (?,?,?,NULL)', [exam_id, it.student_id, it.marks]);
    }
    // Update grades simple rule
    await conn.query('UPDATE results SET grade = CASE WHEN marks>=80 THEN "A" WHEN marks>=70 THEN "B" WHEN marks>=60 THEN "C" WHEN marks>=50 THEN "D" ELSE "F" END WHERE exam_id=?', [exam_id]);
    await conn.commit();
    res.json({ ok: true });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ error: e.message });
  } finally {
    conn.release();
  }
});

export default router;
