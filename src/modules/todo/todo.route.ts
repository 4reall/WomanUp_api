import { Router } from 'express';
import todoController from './todo.controller';
import { authMiddleware } from '../auth/auth.middleware';

const todoRouter = Router();

todoRouter.use(authMiddleware);

todoRouter.get('/', todoController.getTodos);
todoRouter.post('/', todoController.createTodo);
todoRouter.delete('/:todoId', todoController.deleteTodo);
todoRouter.patch('/:todoId', todoController.updateTodo);

export default todoRouter;
