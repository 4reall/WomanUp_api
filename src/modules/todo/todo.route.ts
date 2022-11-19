import { Router } from 'express';
import todoController from './todo.controller';
import { authMiddleware } from '../auth/auth.middleware';

const todoRouter = Router();

todoRouter.use(authMiddleware);

todoRouter.get('/', todoController.getTodos);
todoRouter.post('/', todoController.createTodo);
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;
