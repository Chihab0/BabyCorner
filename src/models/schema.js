import { pgTable, serial, text, integer, numeric, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';

export const deliveryMethodEnum = pgEnum('delivery_method', ['home', 'stopdesk']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category'),
  sizes: text('sizes').array(),
  colors: text('colors').array(),
  price: numeric('price').notNull(),
  stock_quantity: integer('stock_quantity').notNull(),
  images: text('images').array(),
  created_at: timestamp('created_at').defaultNow(),
});

export const deliveryCompanies = pgTable('delivery_companies', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  prices: jsonb('prices'),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  client_name: text('client_name').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  wilaya_id: integer('wilaya_id').notNull(),
  delivery_company_id: integer('delivery_company_id').references(() => deliveryCompanies.id),
  delivery_method: deliveryMethodEnum('delivery_method').notNull(),
  items: jsonb('items'),
  total_price: numeric('total_price').notNull(),
  status: orderStatusEnum('status').default('pending'),
  created_at: timestamp('created_at').defaultNow(),
});

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password_hash: text('password_hash').notNull(),
});
