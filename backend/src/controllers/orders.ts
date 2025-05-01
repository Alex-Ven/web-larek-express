import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/bad-request-errors';
import InternalServerError from '../errors/internal-server-error';
import Product from '../models/product';

enum Payment {
  card = 'card',
  online = 'online'
}

// Вспомогательная функция для валидации email
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /order — создание заказа
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      payment, email, phone, address, total, items,
    } = req.body;

    // Валидация обязательных полей
    if (!payment || !Object.values(Payment).includes(payment)) {
      return next(new BadRequestError('Неверное значение поля payment'));
    }
    if (!email || !validateEmail(email)) {
      return next(new BadRequestError('Неверный формат email'));
    }
    if (!phone || typeof phone !== 'string') {
      return next(new BadRequestError('Неверный формат phone'));
    }
    if (!address || typeof address !== 'string') {
      return next(new BadRequestError('Неверный формат address'));
    }
    if (typeof total !== 'number') {
      return next(new BadRequestError('Неверный формат total'));
    }
    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Неверный формат items'));
    }

    // Проверка товаров
    const products = await Product.find({ _id: { $in: items } });
    if (products.length !== items.length) {
      return next(new BadRequestError('Один или несколько товаров не найдены'));
    }
    const invalidProducts = products.filter((product) => product.price === null);
    if (invalidProducts.length > 0) {
      return next(new BadRequestError('Один или несколько товаров не продаются'));
    }

    // Проверка суммы заказа
    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);
    if (calculatedTotal !== total) {
      return next(new BadRequestError('Неверная сумма заказа'));
    }

    // Генерация ID заказа
    const orderId = faker.string.uuid();

    // Возвращаем успешный ответ
    res.status(201).send({
      id: orderId,
      total,
    });
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    return next(new InternalServerError('Ошибка сервера'));
  }
};

export default createOrder;
