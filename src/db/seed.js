import { db } from './index.js';
import { pool } from '../config/db.js';
import { adminUsers } from '../models/schema.js';
import bcrypt from 'bcrypt';

export default async function seed() {
  const hash = await bcrypt.hash('admin123', 10);
  // Upsert admin user
  const result = await pool.query(`SELECT * FROM admin_users WHERE username = 'admin'`);
  if (result.rows.length === 0) {
    await db.insert(adminUsers).values({ username: 'admin', password_hash: hash });
    console.log('Admin user created.');
  } else {
    await pool.query(`UPDATE admin_users SET password_hash = $1 WHERE username = 'admin'`, [hash]);
    console.log('Admin user password reset.');
  }
}

// Run the seed function if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seed().then(() => process.exit(0));
}
