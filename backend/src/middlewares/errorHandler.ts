import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Определяем статус и сообщение по умолчанию
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ошибка сервера';

  // Отправляем единообразный ответ
  res.status(statusCode).send({ message });
};

export default errorHandler;
