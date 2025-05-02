import Joi from 'joi';

// Схема валидации тела запроса для создания товара
const productBodySchema = Joi.object({
  title: Joi.string().min(2).max(30).required()
    .messages({
      'string.base': 'Поле "title" должно быть строкой',
      'string.min': 'Поле "title" должно содержать минимум 2 символа',
      'string.max': 'Поле "title" должно содержать максимум 30 символов',
      'any.required': 'Поле "title" обязательно для заполнения',
    }),
  image: Joi.object({
    fileName: Joi.string().required().messages({
      'string.base': 'Поле "fileName" должно быть строкой',
      'any.required': 'Поле "fileName" обязательно для заполнения',
    }),
    originalName: Joi.string().required().messages({
      'string.base': 'Поле "originalName" должно быть строкой',
      'any.required': 'Поле "originalName" обязательно для заполнения',
    }),
  }).required(),
  category: Joi.string().required().messages({
    'string.base': 'Поле "category" должно быть строкой',
    'any.required': 'Поле "category" обязательно для заполнения',
  }),
  description: Joi.string().optional().allow('').messages({
    'string.base': 'Поле "description" должно быть строкой',
  }),
  price: Joi.number().optional().allow(null).messages({
    'number.base': 'Поле "price" должно быть числом',
  }),
});

export default productBodySchema;
