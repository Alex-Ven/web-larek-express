// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Определяем статус и сообщение по умолчанию
  let statusCode = 500;
  let message = 'Ошибка сервера';

  // Обработка пользовательских ошибок
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Обработка ошибок валидации Mongoose
  if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
  }

  // Обработка ошибок дублирования уникального поля (E11000)
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Товар с таким названием уже существует';
  }

  // Отправляем единообразный ответ
  res.status(statusCode).send({ message });
};

export default errorHandler;
