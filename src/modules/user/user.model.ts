import { model, Schema } from 'mongoose';

/**
 * @interface IUser
 * @category User
 * @subcategory Interface
 * @property {string} _id User MongoId
 * @property {string} login User e-mail
 * @property {string} password User password.
 * Less than 20, more than 4
 */
export interface IUser {
  _id: string;
  login: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 4, max: 20 },
});

export const User = model<IUser>('User', userSchema);
