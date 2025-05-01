import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
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
const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      payment, email, phone, address, total, items,
    } = req.body;

    // Валидация обязательных полей
    if (!payment || !Object.values(Payment).includes(payment)) {
      return res.status(400).send({ message: 'Неверное значение поля payment' });
    }
    if (!email || !validateEmail(email)) {
      return res.status(400).send({ message: 'Неверный формат email' });
    }
    if (!phone || typeof phone !== 'string') {
      return res.status(400).send({ message: 'Неверный формат phone' });
    }
    if (!address || typeof address !== 'string') {
      return res.status(400).send({ message: 'Неверный формат address' });
    }
    if (typeof total !== 'number') {
      return res.status(400).send({ message: 'Неверный формат total' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).send({ message: 'Неверный формат items' });
    }

    // Проверка товаров
    const products = await Product.find({ _id: { $in: items } });
    if (products.length !== items.length) {
      return res.status(400).send({ message: 'Один или несколько товаров не найдены' });
    }
    const invalidProducts = products.filter((product) => product.price === null);
    if (invalidProducts.length > 0) {
      return res.status(400).send({ message: 'Один или несколько товаров не продаются' });
    }

    // Проверка суммы заказа
    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);
    if (calculatedTotal !== total) {
      return res.status(400).send({ message: 'Неверная сумма заказа' });
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
    res.status(500).send({ message: 'Ошибка сервера' });
  }
};

export default createOrder;
