import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { TodoDto } from './dtos/todo.dto';
import todoService from './todo.service';
import { GetTodosDto } from './dtos/get-todos.dto';
import { validateOrThrow } from '../../lib/validateOrThrow';

/**
 * @class
 * @category Todo
 * @subcategory Controller
 */
export class TodoController {
  /**
   * Method: GET
   * <br/>
   * Route: /todos
   * <br/>
   * Throws an error if req.user.userId
   * (sets automatically for logged-in users by authMiddleware)
   * not provided
   * @async
   * @method
   * @param {GetTodosDto} req.query
   * @return {IUser} Status code 200
   */
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

  /**
   * Method: DELETE
   * <br/>
   * Route: /todos/:todoId
   * @async
   * @method
   * @param {string} req.params.todoId
   * @return {IUser} Status code 200
   */
  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      await todoService.deleteTodo(req.params.todoId);

      res.status(200).json({ message: 'Delete succeed' });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Method: PATCH
   * <br/>
   * Route: /todos/:todoId
   * <br/>
   * Body should contain new title and/or description
   * @async
   * @method
   * @param {TodoDto} req.body
   * @return {IUser} Status code 200
   */
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

  /**
   * Method: POST
   * <br/>
   * Route: /todos
   * <br/>
   * Throws an error if req.user.userId
   * (sets automatically for logged-in users by authMiddleware)
   * not provided
   * @async
   * @method
   * @param {TodoDto} req.body
   * @return {IUser} Status code 200
   */
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
