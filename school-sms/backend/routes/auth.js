import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import { compare, hash } from '../utils/hash.js';
import dotenv from 'dotenv';
dotenv.config();
const router = Router();

// Seed admin if not exists (email: admin@school.local, password: admin123)
router.get('/seed-admin', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email=? LIMIT 1', ['admin@school.local']);
    if (!rows.length) {
      await pool.query(
        'INSERT INTO users (full_name,email,role,password_hash) VALUES (?,?,?,?)',
        ['System Admin','admin@school.local','admin', hash('admin123')]
      );
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT id,full_name,email,role,password_hash FROM users WHERE email=? LIMIT 1', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });
    const u = rows[0];
    if (!compare(password, u.password_hash)) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: u.id, name: u.full_name, email: u.email, role: u.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: u.id, name: u.full_name, email: u.email, role: u.role } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
