import { Request, Response } from 'express';
import Product from '../models/product';

// GET /product — получение всех товаров
export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    // Формируем ответ в ожидаемом формате
    const response = {
      items: products,
      total: products.length,
    };
    res.status(200).send(response);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    res.status(500).send({ message: 'Ошибка сервера' });
  }
};

// POST /product — создание нового товара
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title, image, category, description, price,
    } = req.body;

    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    res.status(201).send(product);
  } catch (error) {
    console.error('Ошибка при создании товара:', error);
    res.status(400).send({ message: 'Неверные данные' });
  }
};
