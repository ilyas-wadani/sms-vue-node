import { Router } from 'express';
import { pool } from '../config/db.js';
const router = Router();

// Public endpoint: student can check results by student_code
router.get('/by-code/:code', async (req, res) => {
  const code = req.params.code;
  const [rows] = await pool.query(`
    SELECT s.full_name, c.name AS class_name, c.section, e.name AS exam_name, e.subject, e.term, e.year, r.marks, r.grade
    FROM students s
    JOIN classes c ON c.id=s.class_id
    JOIN results r ON r.student_id=s.id
    JOIN exams e ON e.id=r.exam_id
    WHERE s.student_code=?
    ORDER BY e.year DESC, e.term DESC, e.date DESC, e.subject
  `, [code]);
  res.json(rows);
});

export default router;
