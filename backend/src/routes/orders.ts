import { Router } from 'express';
import createOrder from '../controllers/orders';

const router = Router();

// POST /order — создание заказа
router.post('/', createOrder);

export default router;
