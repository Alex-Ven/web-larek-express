import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import productsRouter from './routes/product';

const app = express();
const PORT = 3000;

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

// Простой маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Express-сервер запущен!');
});

// Подключение роутов
app.use('/product', productsRouter);

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Не удалось запустить сервер:', error);
  process.exit(1);
});
