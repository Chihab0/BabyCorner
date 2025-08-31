import express from 'express';
import * as adminController from '../controllers/adminController.js';
import * as productsController from '../controllers/productsController.js';
import * as ordersController from '../controllers/ordersController.js';
import * as deliveryCompaniesController from '../controllers/deliveryCompaniesController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { adminLoginSchema, productSchema, orderSchema, deliveryCompanySchema } from '../utils/validation.js';
import { upload } from '../config/multer.js';

const router = express.Router();

// Admin login
router.post('/login', validateRequest(adminLoginSchema), async (req, res, next) => {
  try {
    const token = await adminController.adminLogin(req.body);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// Get admin details
router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const admin = await adminController.getAdminMe(req.admin.id);
    res.json(admin);
  } catch (err) {
    next(err);
  }
});

// Products CRUD (admin)
router.post('/products', authMiddleware, upload.array('images', 5), validateRequest(productSchema), async (req, res, next) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(f => f.filename);
    } else if (Array.isArray(req.body.images)) {
      images = req.body.images;
    }
    const product = await productsController.createProduct({ ...req.body, images });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

router.get('/products', authMiddleware, async (req, res, next) => {
  try {
    const products = await productsController.getProducts(req.query);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/products/low-stock', authMiddleware, async (req, res, next) => {
  try {
    const products = await productsController.getLowStockProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/products/:id', authMiddleware, async (req, res, next) => {
  try {
    const product = await productsController.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/products/:id', authMiddleware, upload.array('images', 5), validateRequest(productSchema), async (req, res, next) => {
  try {
    const product = await productsController.updateProduct(req.params.id, { ...req.body, images: req.files.map(f => f.filename) });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/products/:id', authMiddleware, async (req, res, next) => {
  try {
    await productsController.deleteProduct(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Orders (admin)
router.get('/orders', authMiddleware, async (req, res, next) => {
  try {
    const orders = await ordersController.getOrders(req.query);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/orders/:id', authMiddleware, async (req, res, next) => {
  try {
    const order = await ordersController.getOrderById(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.patch('/orders/:id/status', authMiddleware, async (req, res, next) => {
  try {
    const order = await ordersController.updateOrderStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Delivery Companies (admin)
router.post('/delivery-companies', authMiddleware, validateRequest(deliveryCompanySchema), async (req, res, next) => {
  try {
    const company = await deliveryCompaniesController.createDeliveryCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
});

router.get('/delivery-companies', authMiddleware, async (req, res, next) => {
  try {
    const companies = await deliveryCompaniesController.getDeliveryCompanies();
    res.json(companies);
  } catch (err) {
    next(err);
  }
});

router.put('/delivery-companies/:id', authMiddleware, async (req, res, next) => {
  try {
    const company = await deliveryCompaniesController.updateDeliveryCompany(req.params.id, req.body);
    res.json(company);
  } catch (err) {
    next(err);
  }
});

router.delete('/delivery-companies/:id', authMiddleware, async (req, res, next) => {
  try {
    await deliveryCompaniesController.deleteDeliveryCompany(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.put('/delivery-companies/:id/prices', authMiddleware, async (req, res, next) => {
  try {
    const company = await deliveryCompaniesController.updateDeliveryCompanyPrices(req.params.id, req.body.prices);
    res.json(company);
  } catch (err) {
    next(err);
  }
});

router.get('/delivery-companies/:id/prices', authMiddleware, async (req, res, next) => {
  try {
    const prices = await deliveryCompaniesController.getDeliveryCompanyById(req.params.id);
    res.json(prices);
  } catch (err) {
    next(err);
  }
});

export default router;
