import { db } from '../db/index.js';
import { products } from '../models/schema.js';

export async function getProducts({ category, size, color, page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  let query = db.select().from(products);
  // Filtering
  if (category) query = query.where(products.category.eq(category));
  // Filtering for size and color (arrays)
  // This is a simplified example, adjust for your ORM's array query support
  if (size) query = query.where(products.sizes.contains([size]));
  if (color) query = query.where(products.colors.contains([color]));
  query = query.limit(Number(limit)).offset(Number(offset));
  const result = await query;
  return result;
}

export async function getProductById(id) {
  const product = await db.select().from(products).where(products.id.eq(Number(id)));
  return product[0] || null;
}

export async function createProduct(data) {
  const inserted = await db.insert(products).values(data).returning();
  return inserted[0];
}

export async function updateProduct(id, data) {
  const updated = await db.update(products).set(data).where(products.id.eq(Number(id))).returning();
  return updated[0];
}

export async function deleteProduct(id) {
  await db.delete(products).where(products.id.eq(Number(id)));
}

export async function getLowStockProducts() {
  const result = await db.select().from(products).where(products.stock_quantity.lt(5));
  return result;
}
