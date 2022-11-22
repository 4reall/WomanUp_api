import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class TodoDto {
  @IsOptional()
  @IsMongoId()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  readonly description: string;

  @IsMongoId()
  readonly userId: string;

  constructor(title: string, description: string, userId: string, _id: string) {
    this.title = title;
    this.description = description;
    this.userId = userId;
    this._id = _id;
  }
}
