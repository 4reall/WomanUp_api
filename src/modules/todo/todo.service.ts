import { TodoDto } from './dtos/todo.dto';

export class TodoService {
  async getTodos() {}

  async deleteTodo() {}

  async updateTodo() {}

  async createTodo(todoDto: TodoDto) {}
}

export default new TodoService();
