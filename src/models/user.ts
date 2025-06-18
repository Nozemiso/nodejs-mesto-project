import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

export interface IUser {
  name: string,
  about: string,
  avatar: string
  email: string,
  password: string,
}

export const userSchema = new Schema<IUser>({
  name: {
    type: String, required: true, minlength: 2, maxlength: 30, default: 'Жак-Ив Кусто',
  },
  about: {
    type: String, required: true, minlength: 2, maxlength: 200, default: 'Исследователь',
  },
  avatar: {
    type: String, required: true, default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png', validate: { validator: validator.isURL },
  },
  email: {
    type: String, required: true, unique: true, validate: { validator: validator.isEmail },
  },
  password: { type: String, required: true, select: false },
}, { versionKey: false });

export default mongoose.model<IUser>('user', userSchema);
