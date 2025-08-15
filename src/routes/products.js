import express from 'express';
import * as productsController from '../controllers/productsController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { productSchema } from '../utils/validation.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await productsController.getProducts(req.query);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await productsController.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
