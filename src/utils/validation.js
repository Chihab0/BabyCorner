import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  price: z.string().or(z.number()),
  stock_quantity: z.number().int(),
});

export const orderSchema = z.object({
  client_name: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  wilaya_id: z.number().int(),
  delivery_company_id: z.number().int(),
  delivery_method: z.enum(['home', 'stopdesk']),
  items: z.array(z.object({
    product_id: z.number().int(),
    quantity: z.number().int(),
    price: z.string().or(z.number()),
  })),
  total_price: z.string().or(z.number()),
});

export const deliveryCompanySchema = z.object({
  name: z.string().min(1),
  prices: z.array(z.object({
    wilaya_id: z.number().int(),
    home_price: z.string().or(z.number()),
    stopdesk_price: z.string().or(z.number()),
  })),
});

export const adminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
