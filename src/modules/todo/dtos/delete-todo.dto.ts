import { IsMongoId } from 'class-validator';

export class DeleteTodoDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  todoId: string;

  constructor(userId: string, todoId: string) {
    this.userId = userId;
    this.todoId = todoId;
  }
}
