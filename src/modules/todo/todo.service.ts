import { TodoDto } from './dtos/todo.dto';
import { ITodo, Todo } from './todo.model';
import { GetTodosDto } from './dtos/get-todos.dto';

/**
 * @class
 * @category Todo
 * @subcategory Services
 */
export class TodoService {
  /**
   * If limit not provided, function returns all todos
   * which belong the user with the given id.
   * Otherwise, returns todos from (limit * page) to (limit * page) + limit.
   * If (page * limit) more than all todos sets page to (all todos count / limit)
   * @method
   * @param {GetTodosDto} getTodosDto
   * @return {Promise<ITodo[]>}
   */
  async getTodos(getTodosDto: GetTodosDto): Promise<ITodo[]> {
    const { userId, order, page, sortBy, limit } = getTodosDto;
    const totalCount = await Todo.find({ userId }).count();

    const validPage =
      limit * page > totalCount ? Math.floor(totalCount / limit) : page - 1;

    return Todo.find({ userId })
      .skip(limit * validPage)
      .limit(limit)
      .sort({ [sortBy]: order });
  }

  /**
   * @method
   * @param {string} todoId
   * @return {Promise<void>}
   */
  async deleteTodo(todoId: string) {
    await Todo.findByIdAndDelete(todoId);
  }

  /**
   * Update zero or more fields of the todo with the given id
   * @method
   * @param {TodoDto} todoDto
   * @return {Promise<ITodo>}
   */
  async updateTodo(todoDto: TodoDto) {
    const { _id, ...rest } = todoDto;
    return Todo.findByIdAndUpdate(_id, rest);
  }

  /**
   * @method
   * @param {TodoDto} todoDto
   * @return {Promise<ITodo>}
   */
  async createTodo(todoDto: TodoDto) {
    return await Todo.create(todoDto);
  }
}

export default new TodoService();
