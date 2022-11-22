import { model, Schema, Types } from 'mongoose';
import dayjs from 'dayjs';

export interface ITodo {
  _id: Types.ObjectId;
  title: string;
  description: string;
  createdAt: string;
  userId: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ss') },
  userId: { type: Schema.Types.ObjectId, required: true },
});

export const Todo = model<ITodo>('Todo', todoSchema);
