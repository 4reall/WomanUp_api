import { IsNotEmpty, IsOptional, IsString, Max } from 'class-validator';

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  @Max(100)
  readonly title: string;

  @IsString()
  @IsOptional()
  @Max(300)
  readonly description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
