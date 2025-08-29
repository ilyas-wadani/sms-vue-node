import { Router } from 'express';
import { pool } from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { hash } from '../utils/hash.js';
const router = Router();

router.get('/', authenticate, async (req, res) => {
  const [rows] = await pool.query('SELECT id, full_name, email, phone FROM users WHERE role="teacher" ORDER BY full_name');
  res.json(rows);
});

router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const { full_name, email, phone, password } = req.body;
  const [r] = await pool.query(
    'INSERT INTO users (full_name,email,phone,role,password_hash) VALUES (?,?,?,?,?)',
    [full_name, email, phone, 'teacher', hash(password || 'teacher123')]
  );
  res.json({ id: r.insertId });
});

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { full_name, email, phone } = req.body;
  await pool.query('UPDATE users SET full_name=?, email=?, phone=? WHERE id=? AND role="teacher"', [full_name, email, phone, req.params.id]);
  res.json({ ok: true });
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  await pool.query('DELETE FROM users WHERE id=? AND role="teacher"', [req.params.id]);
  res.json({ ok: true });
});
// RESET PASSWORD (admin only)
router.put('/:id/password', authenticate, authorize('admin'), async (req, res) => {
  const { password } = req.body;
  if (!password || password.length < 4) return res.status(400).json({ error: 'Password required' });
  await pool.query(
    'UPDATE users SET password_hash=? WHERE id=? AND role="teacher"',
    [hash(password), req.params.id]
  );
  res.json({ ok: true });
});


export default router;
