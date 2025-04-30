import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/product';

const router = Router();

// Получение всех товаров
router.get('/', getProduct);

// Создание нового товара
router.post('/', createProduct);

export default router;
