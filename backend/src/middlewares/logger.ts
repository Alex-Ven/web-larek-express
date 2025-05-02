import winston from 'winston';
import expressWinston from 'express-winston';

// Логгер запросов
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }), // Файл для логов запросов
  ],
  format: winston.format.json(), // Формат JSON
  meta: true, // Включить метаданные запроса
  msg: 'HTTP {{req.method}} {{req.url}}', // Шаблон сообщения
  expressFormat: true, // Использовать формат Express
  colorize: false, // Отключить цвета
});

// Логгер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }), // Файл для логов ошибок
  ],
  format: winston.format.json(), // Формат JSON
});
