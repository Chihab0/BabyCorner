import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import deliveryCompanyRoutes from './routes/deliveryCompanies.js';
import adminRoutes from './routes/admin.js';
import { errorHandler } from './middlewares/errorHandler.js';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public/images', express.static(path.resolve('public/images')));

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/delivery-companies', deliveryCompanyRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

app.listen(PORT || 5000, () => {
  console.log(`Server running on port ${PORT || 5000}`);
});
