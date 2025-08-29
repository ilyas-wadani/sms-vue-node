import { Router } from 'express';
import { pool } from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
const router = Router();

router.get('/', authenticate, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM classes ORDER BY name, section');
  res.json(rows);
});

router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const { name, section } = req.body;
  const [r] = await pool.query('INSERT INTO classes (name, section) VALUES (?,?)', [name, section]);
  res.json({ id: r.insertId });
});

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { name, section } = req.body;
  await pool.query('UPDATE classes SET name=?, section=? WHERE id=?', [name, section, req.params.id]);
  res.json({ ok: true });
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  await pool.query('DELETE FROM classes WHERE id=?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
