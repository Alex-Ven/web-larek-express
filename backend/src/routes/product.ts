import { Router } from 'express';
import { celebrate, Joi, errors } from 'celebrate';
import { getProduct, createProduct } from '../controllers/product';

const router = Router();

// Получение всех товаров
router.get('/', getProduct);

// Создание нового товара
router.post('/', createProduct);

export default router;
