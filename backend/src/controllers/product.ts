import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-errors';
import InternalServerError from '../errors/internal-server-error';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';

// GET /product — получение всех товаров
export const getProduct = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    // Формируем ответ в ожидаемом формате
    const response = {
      items: products,
      total: products.length,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка сервера' });
  }
};

// POST /product — создание нового товара
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
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

    return res.status(201).send(product);
  } catch (error) {
    // Обработка ошибок валидации
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }

    // Обработка ошибок дублирования уникального поля
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }

    // Обработка остальных ошибок
    return next(new InternalServerError('Ошибка сервера'));
  }
};
