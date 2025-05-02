import Joi from 'joi';

// Схема валидации тела запроса для создания заказа
const orderBodySchema = Joi.object({
  payment: Joi.string()
    .valid('card', 'online')
    .required()
    .messages({
      'any.required': 'Поле "payment" обязательно для заполнения',
      'any.only': 'Неверное значение поля "payment". Допустимые значения: "card", "online"',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Неверный формат email',
      'any.required': 'Поле "email" обязательно для заполнения',
    }),
  phone: Joi.string()
    .required()
    .messages({
      'any.required': 'Поле "phone" обязательно для заполнения',
      'string.base': 'Поле "phone" должно быть строкой',
    }),
  address: Joi.string()
    .required()
    .messages({
      'any.required': 'Поле "address" обязательно для заполнения',
      'string.base': 'Поле "address" должно быть строкой',
    }),
  total: Joi.number()
    .required()
    .messages({
      'any.required': 'Поле "total" обязательно для заполнения',
      'number.base': 'Поле "total" должно быть числом',
    }),
  items: Joi.array()
    .items(Joi.string().hex().length(24))
    .min(1)
    .required()
    .messages({
      'any.required': 'Поле "items" обязательно для заполнения',
      'array.min': 'Массив "items" должен содержать хотя бы один элемент',
      'array.base': 'Поле "items" должно быть массивом',
    }),
});

export default orderBodySchema;
