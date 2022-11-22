import { NextFunction, Request, Response } from 'express';
import { TodoDto } from './dtos/todo.dto';
import todoService from './todo.service';
import { plainToInstance } from 'class-transformer';
import { GetTodosDto } from './dtos/get-todos.dto';
import { validateOrThrow } from '../../lib/validateOrThrow';

export class TodoController {
  async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const getTodosDto = plainToInstance(GetTodosDto, {
        ...(req.query as object),
        userId: req.user?.userId,
      });
      await validateOrThrow(getTodosDto);

      const todos = await todoService.getTodos(getTodosDto);

      res.status(200).json(todos);
    } catch (e) {
      next(e);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      await todoService.deleteTodo(req.params.todoId);

      res.status(200).json({ message: 'Delete succeed' });
    } catch (e) {
      next(e);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todoDto = plainToInstance(TodoDto, {
        description: req.body.description,
        title: req.body.title,
        _id: req.params.todoId,
      });
      await validateOrThrow(todoDto, {
        skipUndefinedProperties: true,
      });

      const todo = await todoService.updateTodo(todoDto);

      res.status(200).json(todo);
    } catch (e) {
      next(e);
    }
  }

  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todoDto = plainToInstance(TodoDto, {
        ...(req.body as object),
        userId: req.user?.userId,
      });
      await validateOrThrow(todoDto);

      const todo = await todoService.createTodo(todoDto);
      res.status(200).json(todo);
    } catch (e) {
      next(e);
    }
  }
}

export default new TodoController();
