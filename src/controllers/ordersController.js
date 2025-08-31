import { db } from '../db/index.js';
import { orders } from '../models/schema.js';
import { pool } from '../config/db.js';
import { eq } from 'drizzle-orm';

export async function createOrder(data) {
  // Ensure items is a real array, not a string
  let items = data.items;
  if (typeof items === 'string') {
    try {
      items = JSON.parse(items);
    } catch {
      items = [];
    }
  }
  const result = await pool.query(
    `INSERT INTO orders (client_name, phone, address, wilaya_id, delivery_company_id, delivery_method, items, total_price)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, client_name, phone, address, wilaya_id, delivery_company_id, delivery_method, items, total_price, status, created_at`,
    [
      data.client_name,
      data.phone,
      data.address,
      data.wilaya_id,
      data.delivery_company_id,
      data.delivery_method,
      JSON.stringify(items),
      data.total_price
    ]
  );
  return result.rows[0];
}

export async function getOrders(query) {
  // Optionally filter by status, date range
  let q = db.select().from(orders);
  if (query.status) q = q.where(eq(orders.status, query.status));
  // Add date range filter if needed
  const result = await q;
  return result;
}

export async function getOrderById(id) {
  const order = await db.select().from(orders).where(eq(orders.id, Number(id)));
  return order[0] || null;
}

export async function updateOrderStatus(id, status) {
  const updated = await db.update(orders).set({ status }).where(eq(orders.id, Number(id))).returning();
  return updated[0];
}
