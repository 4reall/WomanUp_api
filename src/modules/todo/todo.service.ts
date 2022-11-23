import { TodoDto } from './dtos/todo.dto';
import { Todo } from './todo.model';
import { GetTodosDto } from './dtos/get-todos.dto';

/**
 * @class Todo
 * @category Todo
 * @subcategory Services
 */
export class TodoService {
  /**
   * @method
   * @param {GetTodosDto} getTodosDto
   */
  async getTodos(getTodosDto: GetTodosDto) {
    const { userId, order, page, sortBy, limit } = getTodosDto;
    const totalCount = await Todo.find({ userId }).count();

    const validPage =
      limit * page > totalCount ? Math.floor(totalCount / limit) : page - 1;

    return Todo.find({ userId })
      .skip(limit * validPage)
      .limit(limit)
      .sort({ [sortBy]: order });
  }

  async deleteTodo(todoId: string) {
    await Todo.findByIdAndDelete(todoId);
  }

  async updateTodo(todoDto: TodoDto) {
    const { _id, ...rest } = todoDto;
    return Todo.findByIdAndUpdate(_id, rest);
  }

  async createTodo(todoDto: TodoDto) {
    return await Todo.create(todoDto);
  }
}

export default new TodoService();
