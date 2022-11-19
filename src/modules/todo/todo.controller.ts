import { NextFunction, Request, Response } from 'express';
import { TodoDto } from './dtos/todo.dto';

export class TodoController {
  async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: 'todos' });
    } catch (e) {
      next(e);
    }
  }

  async deleteTodo() {}

  async updateTodo() {}

  async createTodo(todoDto: TodoDto) {}
}

export default new TodoController();
