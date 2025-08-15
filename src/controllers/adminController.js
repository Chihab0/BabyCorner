import { db } from '../db/index.js';
import { pool } from '../config/db.js';
import { comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export async function adminLogin({ username, password }) {
  const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
  const admin = result.rows[0];
  if (!admin) throw new Error('Invalid credentials');
  const valid = await comparePassword(password, admin.password_hash);
  if (!valid) throw new Error('Invalid credentials');
  return generateToken({ id: admin.id, username: admin.username });
}

export async function getAdminMe(adminId) {
  const result = await pool.query('SELECT id, username FROM admin_users WHERE id = $1', [Number(adminId)]);
  const admin = result.rows[0];
  if (!admin) throw new Error('Admin not found');
  return { id: admin.id, username: admin.username };
}
