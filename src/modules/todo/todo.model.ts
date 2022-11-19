import { model, Schema, Types } from 'mongoose';
import dayjs from 'dayjs';

interface ITodo {
  title: string;
  description: string;
  createdAt: string;
  user: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ss') },
  user: { type: Schema.Types.ObjectId, required: true },
});

export const Todo = model<ITodo>('Todo', todoSchema);
