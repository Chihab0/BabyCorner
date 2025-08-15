import express from 'express';
import * as ordersController from '../controllers/ordersController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { orderSchema } from '../utils/validation.js';

const router = express.Router();

router.post('/', validateRequest(orderSchema), async (req, res, next) => {
  try {
    const order = await ordersController.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
