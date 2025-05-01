import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getProduct, createProduct } from '../controllers/product';
import productBodySchema from '../middlewares/validationSchemas/productBodySchema';

const router = Router();

// Получение всех товаров
router.get('/', getProduct);

// Создание нового товара
router.post(
  '/',
  celebrate({
    body: productBodySchema,
  }),
  createProduct,
);

export default router;
