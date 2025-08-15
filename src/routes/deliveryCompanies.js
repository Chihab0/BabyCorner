import express from 'express';
import * as deliveryCompaniesController from '../controllers/deliveryCompaniesController.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const companies = await deliveryCompaniesController.getDeliveryCompanies();
    res.json(companies);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/prices', async (req, res, next) => {
  try {
    const prices = await deliveryCompaniesController.getDeliveryCompanyById(req.params.id);
    res.json(prices);
  } catch (err) {
    next(err);
  }
});

export default router;
