import { db } from '../db/index.js';
import { deliveryCompanies } from '../models/schema.js';
import { eq } from 'drizzle-orm';

export async function getDeliveryCompanies() {
  return await db.select().from(deliveryCompanies);
}

export async function getDeliveryCompanyById(id) {
  const company = await db.select().from(deliveryCompanies).where(eq(deliveryCompanies.id, Number(id)));
  return company[0] || null;
}

export async function createDeliveryCompany(data) {
  const inserted = await db.insert(deliveryCompanies).values(data).returning();
  return inserted[0];
}

export async function updateDeliveryCompany(id, data) {
  const updatedCompany = await db.update(deliveryCompanies).set(data).where(eq(deliveryCompanies.id, Number(id))).returning();
  return updatedCompany[0];
}

export async function deleteDeliveryCompany(id) {
  await db.delete(deliveryCompanies).where(eq(deliveryCompanies.id, Number(id)));
}

export async function updateDeliveryCompanyPrices(id, prices) {
  const updatedPrices = await db.update(deliveryCompanies).set({ prices }).where(eq(deliveryCompanies.id, Number(id))).returning();
  return updatedPrices[0];
}
