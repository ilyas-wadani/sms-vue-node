import { Router } from 'express';
import { pool } from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
const router = Router();

router.get('/', authenticate, async (req, res) => {
  const [rows] = await pool.query(`
    SELECT s.*, c.name AS class_name, c.section
    FROM students s
    LEFT JOIN classes c ON c.id = s.class_id
    ORDER BY s.full_name
  `);
  res.json(rows);
});

router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const { full_name, student_code, class_id, guardian_phone } = req.body;
  const [r] = await pool.query(
    'INSERT INTO students (full_name, student_code, class_id, guardian_phone) VALUES (?,?,?,?)',
    [full_name, student_code, class_id, guardian_phone]
  );
  res.json({ id: r.insertId });
});

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { full_name, student_code, class_id, guardian_phone } = req.body;
  await pool.query(
    'UPDATE students SET full_name=?, student_code=?, class_id=?, guardian_phone=? WHERE id=?',
    [full_name, student_code, class_id, guardian_phone, req.params.id]
  );
  res.json({ ok: true });
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  await pool.query('DELETE FROM students WHERE id=?', [req.params.id]);
  res.json({ ok: true });
});


export default router;
