import mongoose, { Schema, Document } from 'mongoose';

// Интерфейс для типа данных IProduct
export interface IProduct extends Document {
  title: string;
  image: {
    fileName: string;
    originalName: string;
  };
  category: string;
  description?: string; // Необязательное поле
  price?: number | null; // Необязательное поле, по умолчанию null
}

// Схема товара
const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  image: {
    type: {
      fileName: { type: String, required: true },
      originalName: { type: String, required: true },
    },
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // Необязательное поле
  },
  price: {
    type: Number,
    required: false, // Необязательное поле
    default: null, // По умолчанию null
  },
});

// Модель товара
export default mongoose.model<IProduct>('product', productSchema);
