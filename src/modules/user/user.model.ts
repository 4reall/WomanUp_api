import { model, Schema } from 'mongoose';

export interface IUser {
  _id: string;
  login: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
