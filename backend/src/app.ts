import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import productsRouter from './routes/product';
import ordersRouter from './routes/orders';
import errorHandler from './middlewares/errorHandler';
import { errors as celebrateErrors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import NotFoundError from './errors/not-found-error';

// Загрузка переменных окружения из .env
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

// Порт из переменной окружения или значение по умолчанию
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Статический сервер для изображений
app.use('/images', express.static(path.join(__dirname, './public/images')));

// Подключение к MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/weblarek');
    console.log('Подключено к базе данных MongoDB');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    process.exit(1); // Завершаем процесс при ошибке подключения
  }
};

// Логгер запросов
app.use(requestLogger);

// Простой маршрут для проверки работы сервера
app.get('/');

// Подключение роутов
app.use('/product', productsRouter);
app.use('/order', ordersRouter);

// Middleware для обработки несуществующих путей
app.use((_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// Логгер ошибок
app.use(errorLogger);

// Обработка ошибок celebrate
app.use(celebrateErrors());

// Централизованный обработчик ошибок
app.use(errorHandler);

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Не удалось запустить сервер:', error);
  process.exit(1);
});
