import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import createOrder from '../controllers/orders';
import orderBodySchema from '../middlewares/validationSchemas/orderBodySchema';

const router = Router();

// POST /order — создание заказа
router.post(
  '/',
  celebrate({
    body: orderBodySchema,
  }),
  createOrder,
);

export default router;
